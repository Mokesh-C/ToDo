pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "${env.DOCKER_IMAGE ?: 'mokesh17/todo-app'}"
    APP_VERSION = "${env.APP_VERSION ?: 'v1.1'}"
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
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            bat 'npm ci'
          }
        }
      }
    }

    stage('Test') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm test'
          } else {
            bat 'npm test'
          }
        }
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          if (isUnix()) {
            sh "docker build -t ${DOCKER_IMAGE}:${APP_VERSION} ."
          } else {
            bat "docker build -t %DOCKER_IMAGE%:%APP_VERSION% ."
          }
        }
      }
    }

    stage('Push image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            if (isUnix()) {
              sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
              sh "docker push ${DOCKER_IMAGE}:${APP_VERSION}"
            } else {
              // On Windows, use echo and pipe to docker login
              bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"
              bat "docker push %DOCKER_IMAGE%:%APP_VERSION%"
            }
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          if (isUnix()) {
            sh "docker pull ${DOCKER_IMAGE}:${APP_VERSION} || true"
            sh "docker stop todo || true"
            sh "docker rm todo || true"
            sh "docker run -d -p 3000:3000 --name todo ${DOCKER_IMAGE}:${APP_VERSION}"
          } else {
            bat "docker pull %DOCKER_IMAGE%:%APP_VERSION% || exit 0"
            bat "docker stop todo || exit 0"
            bat "docker rm todo || exit 0"
            bat "docker run -d -p 3000:3000 --name todo %DOCKER_IMAGE%:%APP_VERSION%"
          }
        }
      }
    }
  }

  post {
    always {
      script {
        if (isUnix()) {
          sh 'docker images | head -n 20'
        } else {
          bat 'docker images'
        }
      }
    }
  }
}
