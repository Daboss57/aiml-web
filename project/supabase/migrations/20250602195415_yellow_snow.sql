/*
  # Populate courses and lessons for AI/ML learning platform

  This migration adds:
  1. Three main courses:
     - Python Fundamentals for AI/ML
     - Introduction to Machine Learning
     - AI Concepts and Applications
  
  2. Detailed lessons for each course with:
     - Step-by-step content
     - Code examples
     - Practice exercises
     - Expected outputs
*/

-- Insert Courses
INSERT INTO courses (id, title, description, level, duration, image_url) VALUES
(
  'cf45e811-0d0b-4bbd-83fe-1f926c5d7f42',
  'Python Fundamentals for AI/ML',
  'Master the essential Python programming skills needed for AI and machine learning. Perfect for beginners with hands-on exercises and real-world examples.',
  'beginner',
  120,
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
),
(
  'd8f4b8f0-9b2a-4f6f-b8e9-4f1d1a5f8f7a',
  'Introduction to Machine Learning',
  'Learn the fundamentals of machine learning through practical examples. Build your first ML models and understand core concepts like regression and classification.',
  'intermediate',
  180,
  'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
),
(
  'e9b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  'AI Concepts and Applications',
  'Explore artificial intelligence fundamentals, types of AI systems, and their real-world applications. Includes hands-on projects and ethical considerations.',
  'beginner',
  150,
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
);

-- Python Fundamentals Course Lessons
INSERT INTO lessons (course_id, title, description, "order", content, code_template, expected_output) VALUES
(
  'cf45e811-0d0b-4bbd-83fe-1f926c5d7f42',
  'Getting Started with Python',
  'Learn the basics of Python programming and set up your development environment.',
  1,
  E'# Introduction to Python Programming\n\nPython is a versatile programming language that''s perfect for AI and machine learning. Let''s start with the basics!\n\n## Variables and Data Types\n\nIn Python, you can store data in variables:\n\n```python\n# Numbers\nage = 15\nheight = 1.75\n\n# Strings\nname = "Alice"\n\n# Booleans\nis_student = True\n```\n\n## Your First Program\n\nLet''s write a simple program that asks for your name and age, then prints a greeting:\n\n```python\nname = input("What''s your name? ")\nage = int(input("How old are you? "))\nprint(f"Hello {name}! You are {age} years old.")\n```\n\nTry running this code and see what happens!\n\n## Practice Exercise\n\nCreate variables for:\n1. Your favorite number\n2. Your hobby\n3. Whether you like programming (True/False)\n\nThen print them all in a nice format.',
  'favorite_number = 42
hobby = "coding"
likes_programming = True

# Your code here to print the variables
',
  'My favorite number is 42
My hobby is coding
Do I like programming? True'
),
(
  'cf45e811-0d0b-4bbd-83fe-1f926c5d7f42',
  'Lists and Loops',
  'Master Python lists and learn how to iterate through data.',
  2,
  E'# Working with Lists and Loops\n\nLists are fundamental in Python and essential for working with data in AI/ML.\n\n## Creating and Using Lists\n\n```python\n# Creating a list\nnumbers = [1, 2, 3, 4, 5]\nfruits = ["apple", "banana", "orange"]\n\n# Accessing elements\nfirst_number = numbers[0]  # Remember: indexing starts at 0\nlast_fruit = fruits[-1]    # Negative indices count from the end\n```\n\n## Loops in Python\n\n### For Loops\n```python\n# Iterating through a list\nfor fruit in fruits:\n    print(fruit)\n\n# Using range\nfor i in range(5):\n    print(i)  # Prints 0 to 4\n```\n\n### While Loops\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n```\n\n## Practice Exercise\n\nCreate a list of numbers and write a loop to:\n1. Calculate their sum\n2. Find the maximum value\n3. Count even numbers',
  'numbers = [4, 7, 2, 9, 1, 5, 6]

# Calculate sum
total = 0
# Your code here

# Find maximum
maximum = numbers[0]
# Your code here

# Count even numbers
even_count = 0
# Your code here

print(f"Sum: {total}")
print(f"Maximum: {maximum}")
print(f"Number of even numbers: {even_count}")
',
  'Sum: 34
Maximum: 9
Number of even numbers: 3'
),
(
  'cf45e811-0d0b-4bbd-83fe-1f926c5d7f42',
  'Functions and Basic Data Processing',
  'Learn to write functions and process data efficiently.',
  3,
  E'# Functions and Data Processing\n\nFunctions are essential for organizing code and making it reusable.\n\n## Defining Functions\n\n```python\ndef greet(name):\n    return f"Hello, {name}!"\n\ndef calculate_average(numbers):\n    return sum(numbers) / len(numbers)\n```\n\n## Working with Data\n\n```python\n# Processing lists of numbers\ndata = [23, 45, 67, 89, 12, 34, 56]\n\ndef analyze_data(numbers):\n    average = sum(numbers) / len(numbers)\n    minimum = min(numbers)\n    maximum = max(numbers)\n    return average, minimum, maximum\n```\n\n## Practice Exercise\n\nCreate functions to:\n1. Calculate the median of a list of numbers\n2. Count occurrences of each element\n3. Find numbers above a threshold',
  'def calculate_median(numbers):
    # Your code here
    pass

def count_occurrences(data):
    # Your code here
    pass

def find_above_threshold(numbers, threshold):
    # Your code here
    pass

# Test data
numbers = [4, 7, 2, 9, 1, 5, 6, 3, 8]
threshold = 5

# Test your functions
median = calculate_median(numbers)
counts = count_occurrences(numbers)
above = find_above_threshold(numbers, threshold)

print(f"Median: {median}")
print(f"Occurrences: {counts}")
print(f"Numbers above {threshold}: {above}")
',
  'Median: 5
Occurrences: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1}
Numbers above 5: [7, 9, 6, 8]'
);

-- Machine Learning Course Lessons
INSERT INTO lessons (course_id, title, description, "order", content, code_template, expected_output) VALUES
(
  'd8f4b8f0-9b2a-4f6f-b8e9-4f1d1a5f8f7a',
  'Introduction to Machine Learning',
  'Understand what machine learning is and its basic concepts.',
  1,
  '# Introduction to Machine Learning\n\nMachine Learning (ML) is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed.\n\n## Key Concepts\n\n1. Types of Machine Learning:\n   - Supervised Learning\n   - Unsupervised Learning\n   - Reinforcement Learning\n\n2. Common Applications:\n   - Prediction\n   - Classification\n   - Pattern Recognition\n\n## Your First ML Code\n\nLet''s start with a simple example using scikit-learn:\n\n```python\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# Create sample data\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 6, 8, 10])\n\n# Create and train the model\nmodel = LinearRegression()\nmodel.fit(X, y)\n\n# Make predictions\nprediction = model.predict([[6]])\nprint(f"Predicted value: {prediction[0]}")\n```\n\n## Practice Exercise\n\nCreate a simple dataset and use it to:\n1. Train a linear regression model\n2. Make predictions\n3. Calculate the model''s accuracy',
  'import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# Create your dataset
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Create and train model
model = LinearRegression()
# Your code here

# Make predictions
# Your code here

# Calculate accuracy
# Your code here

print(f"Predictions: {predictions}")
print(f"Accuracy (R² score): {accuracy}")
',
  'Predictions: [12.]
Accuracy (R² score): 1.0'
),
(
  'd8f4b8f0-9b2a-4f6f-b8e9-4f1d1a5f8f7a',
  'Linear Regression',
  'Learn about linear regression and how to implement it.',
  2,
  E'# Linear Regression\n\nLinear regression is one of the fundamental algorithms in machine learning, perfect for predicting numerical values.\n\n## Understanding Linear Regression\n\nLinear regression finds the best-fitting line through your data points by minimizing the distance between the line and the points.\n\n```python\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\n# Generate sample data\nX = np.random.rand(100, 1) * 10\ny = 2 * X + 1 + np.random.randn(100, 1) * 0.5\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Make predictions\npredictions = model.predict(X_test)\n```\n\n## Practice Exercise\n\nCreate a linear regression model to:\n1. Predict house prices based on size\n2. Evaluate the model''s performance\n3. Visualize the results',
  'import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Create house price dataset
sizes = np.random.rand(100, 1) * 2000 + 1000  # House sizes between 1000-3000 sq ft
prices = sizes * 200 + 100000 + np.random.randn(100, 1) * 10000

# Split the data
# Your code here

# Create and train the model
# Your code here

# Make predictions
# Your code here

# Calculate metrics
# Your code here

print(f"Mean squared error: {mse}")
print(f"R² score: {r2}")
print(f"Predicted price for a 2500 sq ft house: ${prediction[0]:.2f}")
',
  'Mean squared error: 100000000.0
R² score: 0.95
Predicted price for a 2500 sq ft house: $600000.00'
),
(
  'd8f4b8f0-9b2a-4f6f-b8e9-4f1d1a5f8f7a',
  'Decision Trees and Random Forests',
  'Explore decision trees and random forests for classification and regression.',
  3,
  E'# Decision Trees and Random Forests\n\nDecision trees are powerful algorithms that can be used for both classification and regression tasks.\n\n## Decision Trees\n\n```python\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.datasets import make_classification\n\n# Generate sample data\nX, y = make_classification(n_samples=100, n_features=2, n_classes=2)\n\n# Create and train model\ntree = DecisionTreeClassifier(max_depth=3)\ntree.fit(X, y)\n```\n\n## Random Forests\n\nRandom forests combine multiple decision trees to make more accurate predictions:\n\n```python\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Create and train model\nrf = RandomForestClassifier(n_estimators=100)\nrf.fit(X, y)\n```\n\n## Practice Exercise\n\nCreate a random forest model to:\n1. Classify iris flowers\n2. Compare its performance with a decision tree\n3. Visualize feature importance',
  'from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load iris dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split data
# Your code here

# Train decision tree
# Your code here

# Train random forest
# Your code here

# Make predictions and calculate accuracy
# Your code here

print(f"Decision Tree Accuracy: {dt_accuracy:.2f}")
print(f"Random Forest Accuracy: {rf_accuracy:.2f}")
print("\nFeature Importance:")
for name, importance in zip(iris.feature_names, rf.feature_importances_):
    print(f"{name}: {importance:.3f}")
',
  'Decision Tree Accuracy: 0.95
Random Forest Accuracy: 0.97
Feature Importance:
sepal length (cm): 0.150
sepal width (cm): 0.050
petal length (cm): 0.450
petal width (cm): 0.350'
);

-- AI Concepts Course Lessons
INSERT INTO lessons (course_id, title, description, "order", content, code_template, expected_output) VALUES
(
  'e9b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  'Understanding AI',
  'Learn about different types of AI and their applications.',
  1,
  E'# Understanding Artificial Intelligence\n\nArtificial Intelligence (AI) is the field of computer science focused on creating intelligent machines that can perform tasks typically requiring human intelligence.\n\n## Types of AI\n\n1. Narrow/Weak AI\n   - Designed for specific tasks\n   - Examples: Siri, chess programs\n\n2. General/Strong AI\n   - Human-level intelligence across tasks\n   - Still theoretical\n\n3. Super AI\n   - Surpasses human intelligence\n   - Currently hypothetical\n\n## AI Applications\n\n- Virtual Assistants\n- Autonomous Vehicles\n- Medical Diagnosis\n- Game Playing\n- Natural Language Processing\n\n## Practice Exercise\n\nCreate a simple chatbot using if-else statements to understand basic AI concepts.',
  'def simple_chatbot(user_input):
    # Convert input to lowercase for easier matching
    user_input = user_input.lower()
    
    # Your code here to handle different inputs
    # and return appropriate responses
    pass

# Test the chatbot
test_inputs = [
    "hello",
    "how are you",
    "what is AI",
    "goodbye"
]

for input_text in test_inputs:
    response = simple_chatbot(input_text)
    print(f"User: {input_text}")
    print(f"Bot: {response}\n")
',
  'User: hello
Bot: Hi there! How can I help you?

User: how are you
Bot: I''m doing well, thank you for asking!

User: what is AI
Bot: AI is the field of computer science focused on creating intelligent machines.

User: goodbye
Bot: Goodbye! Have a great day!'
),
(
  'e9b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  'Neural Networks Basics',
  'Introduction to neural networks and their structure.',
  2,
  E'# Neural Networks Basics\n\nNeural networks are computing systems inspired by biological neural networks in human brains.\n\n## Structure of Neural Networks\n\n1. Input Layer\n   - Receives raw data\n\n2. Hidden Layers\n   - Process information\n   - Multiple layers possible\n\n3. Output Layer\n   - Produces final result\n\n## Simple Neural Network Example\n\n```python\nimport numpy as np\n\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\ndef simple_neural_network(input_data, weights):\n    hidden_layer = sigmoid(np.dot(input_data, weights[0]))\n    output = sigmoid(np.dot(hidden_layer, weights[1]))\n    return output\n```\n\n## Practice Exercise\n\nImplement a simple neural network to:\n1. Process binary inputs\n2. Learn basic logic gates\n3. Make predictions',
  'import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def initialize_weights():
    # Create random weights for a simple neural network
    # Input layer: 2 neurons
    # Hidden layer: 3 neurons
    # Output layer: 1 neuron
    
    # Your code here
    pass

def train_network(X, y, weights, learning_rate=0.1, epochs=1000):
    # Train the neural network
    # Your code here
    pass

# Test data (XOR gate)
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

# Initialize and train
weights = initialize_weights()
trained_weights = train_network(X, y, weights)

# Make predictions
# Your code here

print("XOR Gate Predictions:")
for i in range(len(X)):
    print(f"Input: {X[i]} -> Output: {predictions[i]:.3f}")
',
  'XOR Gate Predictions:
Input: [0 0] -> Output: 0.051
Input: [0 1] -> Output: 0.947
Input: [1 0] -> Output: 0.953
Input: [1 1] -> Output: 0.042'
),
(
  'e9b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  'Ethics in AI',
  'Explore ethical considerations in AI development and deployment.',
  3,
  E'# Ethics in Artificial Intelligence\n\nEthical considerations are crucial in AI development to ensure responsible and beneficial use of the technology.\n\n## Key Ethical Considerations\n\n1. Bias and Fairness\n   - Data bias\n   - Algorithmic bias\n   - Fair representation\n\n2. Privacy and Security\n   - Data protection\n   - User consent\n   - Security measures\n\n3. Transparency\n   - Explainable AI\n   - Decision-making process\n   - User awareness\n\n## Case Study\n\nLet''s examine a real-world example of bias in AI:\n\n```python\n# Example: Gender bias in job application screening\nfrom sklearn.linear_model import LogisticRegression\n\n# Features: education_level, experience_years, gender\nX = [[1, 5, 0],  # 0 = female\n     [1, 3, 1],  # 1 = male\n     [0, 2, 0],\n     [1, 4, 1]]\ny = [1, 1, 0, 1]  # hired or not\n\nmodel = LogisticRegression()\nmodel.fit(X, y)\n```\n\n## Practice Exercise\n\nAnalyze a dataset for potential bias and implement measures to ensure fairness.',
  'import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix

# Create a sample dataset
np.random.seed(42)

# Generate synthetic job application data
n_samples = 1000

# Your code here to:
# 1. Create balanced dataset
# 2. Train model
# 3. Analyze bias
# 4. Implement fairness measures

# Print bias analysis results
print("Original Model Bias Analysis:")
print(f"Female acceptance rate: {female_rate:.2f}")
print(f"Male acceptance rate: {male_rate:.2f}")
print("\nAfter Bias Correction:")
print(f"Female acceptance rate: {corrected_female_rate:.2f}")
print(f"Male acceptance rate: {corrected_male_rate:.2f}")
',
  'Original Model Bias Analysis:
Female acceptance rate: 0.65
Male acceptance rate: 0.85

After Bias Correction:
Female acceptance rate: 0.75
Male acceptance rate: 0.76'
);