pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "${env.DOCKER_IMAGE ?: 'myname/todo-app'}"
    APP_VERSION = "${env.APP_VERSION ?: 'v0.9'}"
    REGISTRY = "docker.io"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker image') {
      steps {
        sh "docker build -t ${DOCKER_IMAGE}:${APP_VERSION} ."
      }
    }

    stage('Push image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
          sh "docker push ${DOCKER_IMAGE}:${APP_VERSION}"
        }
      }
    }

    stage('Deploy') {
      steps {
        sh "docker pull ${DOCKER_IMAGE}:${APP_VERSION} || true"
        sh "docker stop todo || true"
        sh "docker rm todo || true"
        sh "docker run -d -p 3000:3000 --name todo ${DOCKER_IMAGE}:${APP_VERSION}"
      }
    }
  }

  post {
    always {
      sh 'docker images | head -n 20'
    }
  }
}
