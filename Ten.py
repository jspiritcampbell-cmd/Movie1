import streamlit as st
import pandas as pd
import numpy as np

# Set page configuration
st.set_page_config(
    page_title="My Streamlit App",
    page_icon="🚀",
    layout="wide"
)

# Title and description
st.title("🚀 Welcome to My Streamlit App")
st.markdown("This is a sample Streamlit application demonstrating various features.")

# Sidebar
st.sidebar.header("Settings")
user_name = st.sidebar.text_input("Enter your name:", "User")
st.sidebar.write(f"Hello, {user_name}!")

# Main content with tabs
tab1, tab2, tab3 = st.tabs(["📊 Data Visualization", "🔢 Interactive Widgets", "📝 Text & Media"])

with tab1:
    st.header("Data Visualization")
    
    # Generate sample data
    chart_data = pd.DataFrame(
        np.random.randn(20, 3),
        columns=['Column A', 'Column B', 'Column C']
    )
    
    st.subheader("Line Chart")
    st.line_chart(chart_data)
    
    st.subheader("Sample DataFrame")
    st.dataframe(chart_data)

with tab2:
    st.header("Interactive Widgets")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Input Widgets")
        slider_val = st.slider("Select a value", 0, 100, 50)
        st.write(f"Slider value: {slider_val}")
        
        option = st.selectbox(
            "Choose an option:",
            ["Option 1", "Option 2", "Option 3"]
        )
        st.write(f"You selected: {option}")
    
    with col2:
        st.subheader("Button & Checkbox")
        if st.button("Click me!"):
            st.success("Button clicked! 🎉")
        
        checkbox = st.checkbox("Show additional info")
        if checkbox:
            st.info("This is some additional information!")

with tab3:
    st.header("Text & Media")
    
    st.subheader("Different text elements")
    st.write("This is regular text using st.write()")
    st.info("This is an info message")
    st.success("This is a success message")
    st.warning("This is a warning message")
    st.error("This is an error message")
    
    st.subheader("Code Display")
    code = '''def hello():
    print("Hello, Streamlit!")'''
    st.code(code, language='python')

# Footer
st.divider()
st.caption("Built with Streamlit 🎈")
