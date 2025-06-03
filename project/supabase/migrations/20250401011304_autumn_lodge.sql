/*
  # Create lessons and progress tracking tables

  1. New Tables
    - `lessons`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `order` (integer)
      - `created_at` (timestamp)
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `lesson_id` (uuid, references lessons)
      - `completed` (boolean)
      - `code_submissions` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  lesson_id uuid REFERENCES lessons NOT NULL,
  completed boolean DEFAULT false,
  code_submissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Lessons are viewable by authenticated users"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can modify their own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial lessons
INSERT INTO lessons (title, description, content, "order") VALUES
('Introduction to AI and Machine Learning', 
'Learn the fundamental concepts of AI and ML', 
'# Introduction to AI and Machine Learning

Artificial Intelligence (AI) and Machine Learning (ML) are transforming the world around us. In this lesson, we''ll explore the fundamental concepts and get started with practical examples.

## What is Artificial Intelligence?

AI is the simulation of human intelligence by machines. It encompasses:
- Problem solving
- Pattern recognition
- Learning from experience
- Adapting to new situations

## What is Machine Learning?

Machine Learning is a subset of AI that focuses on:
- Learning from data
- Identifying patterns
- Making decisions with minimal human intervention

## Your First AI Program

Let''s write a simple program that makes a decision based on data:

```python
def simple_ai_decision(temperature):
    if temperature > 30:
        return "It''s too hot, turn on the AC"
    elif temperature < 15:
        return "It''s cold, turn on the heating"
    else:
        return "Temperature is comfortable"

# Test your function
print(simple_ai_decision(35))
print(simple_ai_decision(20))
print(simple_ai_decision(10))
```

## Exercise

Try modifying the temperature thresholds and adding more conditions to the function. What other environmental factors could you include in your decision-making system?',
1),

('Python Basics for Machine Learning',
'Master the essential Python concepts needed for ML',
'# Python Basics for Machine Learning

Python is the most popular programming language for AI and ML. Let''s learn the essential concepts you''ll need.

## Variables and Data Types

```python
# Numbers
x = 42        # integer
y = 3.14      # float

# Strings
name = "Alice"

# Lists
numbers = [1, 2, 3, 4, 5]

# Dictionaries
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

## Functions and Control Flow

```python
def analyze_data(data):
    if len(data) == 0:
        return "No data to analyze"
    
    total = sum(data)
    average = total / len(data)
    
    if average > 100:
        return "High values detected"
    elif average > 50:
        return "Medium values detected"
    else:
        return "Low values detected"

# Test the function
test_data = [75, 82, 91, 64]
result = analyze_data(test_data)
print(f"Analysis result: {result}")
```

## Exercise

Create a function that:
1. Takes a list of numbers
2. Calculates the mean and standard deviation
3. Identifies outliers (values more than 2 standard deviations from the mean)
4. Returns the outliers found

Try this with different datasets!',
2),

('Data Manipulation with NumPy',
'Learn how to work with numerical data using NumPy',
'# Data Manipulation with NumPy

NumPy is the foundation for scientific computing in Python. It provides powerful tools for working with arrays and performing numerical operations.

## Creating Arrays

```python
import numpy as np

# Create arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.zeros(5)
arr3 = np.ones((2, 3))
arr4 = np.random.rand(3, 3)

print("Array 1:", arr1)
print("Array 2:", arr2)
print("Array 3:", arr3)
print("Array 4:", arr4)
```

## Array Operations

```python
# Basic operations
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print("Addition:", a + b)
print("Multiplication:", a * b)
print("Square root:", np.sqrt(a))
print("Mean:", np.mean(a))
print("Standard deviation:", np.std(a))
```

## Exercise

1. Create a 5x5 matrix of random numbers
2. Calculate the sum of each row and column
3. Find the maximum and minimum values
4. Calculate the correlation between two rows

Try experimenting with different array shapes and operations!',
3);