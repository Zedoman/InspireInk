from langgraph.graph import MessagesState, START

# Set up the tools
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode
from copilotkit.langchain import copilotkit_customize_config



@tool
def suggest_plot_twists():
    """Generate plot twists or endings."""
    # Placeholder for generating plot twists
    return "What if the protagonist discovers they have a secret sibling?"

@tool
def style_suggestions(author: str):
    """Offer style suggestions based on famous authors."""
    # Placeholder for offering style suggestions
    return f"Writing in the style of {author}, consider using longer sentences with complex structures."

tools = [suggest_plot_twists, style_suggestions]
tool_node = ToolNode(tools)

# Set up the model
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel

# Initialize Gemini (Google Generative AI) model
model = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

# We are going to "bind" all tools to the model
# We have the actual tools from above, but we also need a mock tool to ask a human
class AskHuman(BaseModel):
    """Ask the human a question"""
    question: str

model = model.bind_tools(tools + [AskHuman])

# Define nodes and conditional edges

# Define the function that determines whether to continue or not
def should_continue(state):
    messages = state["messages"]
    last_message = messages[-1]
    # If there is no function call, then we finish
    if not last_message.tool_calls:
        return "end"
    # If tool call is asking Human, we return that node
    elif last_message.tool_calls[0]["name"] == "AskHuman":
        return "ask_human"
    # Otherwise if there is, we continue
    else:
        return "continue"

# Define the function that calls the model
def call_model(state, config):
    config = copilotkit_customize_config(
        config,
        emit_tool_calls="AskHuman",
    )
    messages = state["messages"]
    response = model.invoke(messages, config=config)
    return {"messages": [response]}

# We define a fake node to ask the human
def ask_human(state):
    pass

# Build the graph
from langgraph.graph import END, StateGraph

workflow = StateGraph(MessagesState)

# Define the three nodes we will cycle between
workflow.add_node("agent", call_model)
workflow.add_node("action", tool_node)
workflow.add_node("ask_human", ask_human)

# Set the entrypoint as `agent`
workflow.add_edge(START, "agent")

# Add a conditional edge
workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "continue": "action",
        "ask_human": "ask_human",
        "end": END,
    },
)

# Add normal edge from `tools` to `agent`
workflow.add_edge("action", "agent")

# After we get back the human response, we go back to the agent
workflow.add_edge("ask_human", "agent")

# Set up memory
from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()

# Compile the graph
graph = workflow.compile(checkpointer=memory, interrupt_after=["ask_human"])
