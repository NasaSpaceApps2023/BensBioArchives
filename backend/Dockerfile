# Use an official Python runtime as a base image
FROM python:3.11-alpine

# Set the working directory
WORKDIR /app

# Install the required packages
COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . /app/

# Make port 80 available to the world outside this container
EXPOSE 80

# Run main.py using Uvicorn when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]