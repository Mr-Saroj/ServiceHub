# Build stage: use Maven with Java 21
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy Maven files and source
COPY pom.xml .
COPY src ./src

# Build the Spring Boot jar
RUN mvn clean package -DskipTests

# Run stage: use Eclipse Temurin 21 JDK
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/Backend-servicehub-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080



# Run the Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]