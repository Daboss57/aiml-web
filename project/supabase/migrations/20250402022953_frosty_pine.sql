/*
  # Update lessons with comprehensive content

  1. Changes
    - Update existing lessons with detailed content
    - Add proper markdown formatting and code examples
    - Include interactive exercises
*/

DO $$ 
BEGIN
  -- Update first lesson
  UPDATE lessons 
  SET content = '# Introduction to AI and Machine Learning

Welcome to your first step into the exciting world of Artificial Intelligence and Machine Learning! In this lesson, we''ll explore the fundamental concepts and get started with practical examples.

## What is Artificial Intelligence?

Artificial Intelligence (AI) is the simulation of human intelligence by machines. It encompasses:
- Problem solving
- Pattern recognition
- Learning from experience
- Adapting to new situations

Think of AI as teaching computers to think and learn like humans do. Just as we learn from experience, AI systems learn from data.

## What is Machine Learning?

Machine Learning is a subset of AI that focuses on:
- Learning from data
- Identifying patterns
- Making decisions with minimal human intervention

The key difference between traditional programming and machine learning is that in ML, we don''t explicitly program all the rules. Instead, we let the computer learn these rules from data.

## Your First AI Program

Let''s write a simple program that makes a decision based on data. This program will recommend actions based on temperature readings:

```python
def recommend_action(temperature):
    if temperature > 30:
        return "It''s too hot! Turn on the AC"
    elif temperature < 15:
        return "It''s cold! Turn on the heating"
    else:
        return "The temperature is comfortable"

# Test with different temperatures
temperatures = [35, 20, 10]
for temp in temperatures:
    recommendation = recommend_action(temp)
    print(f"When it''s {temp}°C: {recommendation}")
```

Try running this code and experiment with different temperature values!

## Exercise: Build Your First AI Decision Maker

Now it''s your turn! Modify the code above to create a more sophisticated decision maker. Here are some ideas:

1. Add more conditions (e.g., "very hot", "very cold")
2. Include humidity as a factor
3. Add time of day considerations

Example template to get you started:

```python
def smart_climate_control(temperature, humidity, time_of_day):
    # Your code here
    pass

# Test your function
print(smart_climate_control(25, 60, "afternoon"))
```

## Key Takeaways

- AI is about making machines think and learn
- Machine Learning is about learning from data
- Even simple if-else rules can be considered a basic form of AI
- Real AI systems use much more complex algorithms and data

## Next Steps

In the next lesson, we''ll dive into Python fundamentals and start working with more complex AI concepts. Make sure you''re comfortable with the basic concepts we''ve covered here before moving on.'
  WHERE "order" = 1;

  -- Update second lesson
  UPDATE lessons 
  SET content = '# Python Basics for Machine Learning

Welcome to your Python programming journey! Python is the most popular language for AI and ML development. Let''s master the essential concepts you''ll need.

## Variables and Data Types

Python has several basic data types that we use frequently in ML:

```python
# Numbers
x = 42        # integer
y = 3.14      # float

# Strings
name = "Alice"

# Lists (ordered collections)
numbers = [1, 2, 3, 4, 5]

# Dictionaries (key-value pairs)
person = {
    "name": "Bob",
    "age": 25,
    "skills": ["Python", "ML"]
}

# Print everything
print(f"x: {x}, y: {y}")
print(f"name: {name}")
print(f"numbers: {numbers}")
print(f"person: {person}")
```

## Working with Lists

Lists are crucial in ML for handling datasets:

```python
# Creating and manipulating lists
numbers = [1, 2, 3, 4, 5]

# Adding elements
numbers.append(6)        # Add to end
numbers.insert(0, 0)    # Add at position

# Slicing
first_three = numbers[:3]    # Get first three
last_three = numbers[-3:]    # Get last three

# List comprehension
squares = [x**2 for x in numbers]

print("Original:", numbers)
print("First three:", first_three)
print("Squares:", squares)
```

## Functions and Control Flow

Functions help us organize and reuse code:

```python
def analyze_data(data):
    """
    Analyze a list of numbers and return basic statistics
    """
    if not data:
        return "No data to analyze"
    
    # Calculate basic statistics
    total = sum(data)
    length = len(data)
    mean = total / length
    
    # Sort data for median
    sorted_data = sorted(data)
    median = sorted_data[length//2]
    
    return {
        "mean": mean,
        "median": median,
        "min": min(data),
        "max": max(data)
    }

# Test the function
test_data = [75, 82, 91, 64, 88]
result = analyze_data(test_data)
print("Analysis result:", result)
```

## Exercise: Data Analysis Function

Create a function that performs the following tasks:

1. Takes a list of numbers
2. Calculates:
   - Mean
   - Standard deviation
   - Number of values above mean
   - Number of values below mean
3. Returns the results in a dictionary

Here''s a template to get you started:

```python
def advanced_analysis(data):
    """
    Perform advanced statistical analysis on a dataset
    """
    # Your code here
    pass

# Test data
test_data = [64, 72, 81, 93, 85, 77, 69, 88]
result = advanced_analysis(test_data)
print(result)
```

## Bonus Challenge

Modify your function to:
1. Handle empty lists and invalid inputs
2. Add visualization (hint: use print to create a simple ASCII chart)
3. Identify outliers (values more than 2 standard deviations from mean)

## Key Takeaways

- Python provides powerful data types for ML
- Lists and dictionaries are fundamental for data handling
- Functions help organize and reuse code
- Error handling is crucial for robust programs

## Next Steps

In the next lesson, we''ll explore NumPy, the foundation for numerical computing in Python. Make sure you''re comfortable with these basics before moving on!'
  WHERE "order" = 2;

  -- Update third lesson
  UPDATE lessons 
  SET content = '# Data Manipulation with NumPy

Welcome to the world of NumPy! NumPy is the foundation for scientific computing in Python and is essential for machine learning. Let''s master its key concepts.

## Introduction to NumPy Arrays

NumPy arrays are more efficient than Python lists for numerical computations:

```python
import numpy as np

# Creating arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.zeros(5)                  # Array of zeros
arr3 = np.ones((2, 3))             # 2x3 array of ones
arr4 = np.random.rand(3, 3)        # 3x3 random array

print("Array 1:", arr1)
print("Array 2:", arr2)
print("Array 3:", arr3)
print("Array 4:", arr4)
```

## Array Operations

NumPy makes mathematical operations fast and easy:

```python
# Create two arrays
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Basic operations
print("Addition:", a + b)
print("Multiplication:", a * b)
print("Square root:", np.sqrt(a))
print("Mean:", np.mean(a))
print("Standard deviation:", np.std(a))

# Matrix operations
matrix1 = np.array([[1, 2], [3, 4]])
matrix2 = np.array([[5, 6], [7, 8]])
print("Matrix multiplication:", np.dot(matrix1, matrix2))
```

## Data Analysis with NumPy

Let''s create a function to analyze temperature data:

```python
def analyze_temperatures(temperatures):
    """
    Analyze daily temperature readings
    """
    temp_array = np.array(temperatures)
    
    analysis = {
        "mean": np.mean(temp_array),
        "std": np.std(temp_array),
        "min": np.min(temp_array),
        "max": np.max(temp_array),
        "range": np.ptp(temp_array),  # Peak to peak (range)
        "variance": np.var(temp_array)
    }
    
    # Find outliers (temperatures > 2 std from mean)
    mean = analysis["mean"]
    std = analysis["std"]
    outliers = temp_array[np.abs(temp_array - mean) > 2 * std]
    analysis["outliers"] = outliers.tolist()
    
    return analysis

# Test the function
daily_temps = [20, 21, 23, 22, 19, 18, 25, 30, 17, 21]
result = analyze_temperatures(daily_temps)
print("Temperature Analysis:", result)
```

## Exercise: Weather Data Analysis

Create a program that:

1. Generates synthetic weather data
2. Analyzes patterns
3. Makes predictions

Here''s a template:

```python
def generate_weather_data(days):
    """
    Generate synthetic weather data
    """
    # Generate random temperatures with a realistic pattern
    temps = np.random.normal(22, 5, days)  # Mean of 22°C, std of 5
    
    # Add a seasonal trend
    seasonal_trend = 5 * np.sin(np.linspace(0, 2*np.pi, days))
    temps += seasonal_trend
    
    return temps

def analyze_weather_patterns(data):
    """
    Analyze weather patterns and make predictions
    """
    # Your code here
    pass

# Generate 30 days of weather data
days = 30
weather_data = generate_weather_data(days)

# Analyze the data
analysis = analyze_weather_patterns(weather_data)
print(analysis)
```

## Challenge: Advanced Weather Analysis

Extend your weather analysis program to:

1. Calculate moving averages
2. Detect temperature trends
3. Identify unusual weather patterns
4. Make predictions for the next few days

## Key Takeaways

- NumPy arrays are fundamental for numerical computing
- NumPy provides efficient operations on large datasets
- Statistical functions in NumPy are fast and reliable
- Real-world data analysis often combines multiple NumPy features

## Next Steps

In the next lesson, we''ll explore pandas for data manipulation and analysis. Make sure you''re comfortable with NumPy before moving on!'
  WHERE "order" = 3;
END $$;