# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /pap

COPY mvnw .          
COPY .mvn/ .mvn
COPY pom.xml ./
COPY src ./src

# Give execute permission for mvnw
RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /pap
COPY --from=builder /pap/target/*.jar app.jar

EXPOSE 2002

ENTRYPOINT ["java", "-jar", "app.jar"]