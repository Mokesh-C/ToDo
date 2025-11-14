pipeline {
  agent any

  triggers {
    // Poll GitHub every 2 minutes for changes
    pollSCM('H/2 * * * *')
  }

  environment {
    DOCKER_IMAGE = "${env.DOCKER_IMAGE ?: 'mokesh17/todo-app'}"
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
          // Get version from git tags
          def appVersion
          if (isUnix()) {
            appVersion = sh(script: 'git describe --tags --abbrev=0 2>/dev/null || echo "latest"', returnStdout: true).trim()
            sh "docker build -t ${DOCKER_IMAGE}:${appVersion} ."
          } else {
            appVersion = bat(script: '@git describe --tags --abbrev=0 2>nul || echo latest', returnStdout: true).trim()
            bat "docker build -t %DOCKER_IMAGE%:${appVersion} ."
          }
          env.APP_VERSION = appVersion
        }
      }
    }

    stage('Push image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            if (isUnix()) {
              sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
              sh "docker push ${DOCKER_IMAGE}:${env.APP_VERSION}"
            } else {
              // On Windows, use echo and pipe to docker login
              bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"
              bat "docker push %DOCKER_IMAGE%:${env.APP_VERSION}"
            }
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          if (isUnix()) {
            sh "docker pull ${DOCKER_IMAGE}:${env.APP_VERSION} || true"
            sh "docker stop todo || true"
            sh "docker rm todo || true"
            sh "docker run -d -p 3000:3000 --name todo ${DOCKER_IMAGE}:${env.APP_VERSION}"
          } else {
            bat "docker pull %DOCKER_IMAGE%:${env.APP_VERSION} || exit 0"
            bat "docker stop todo || exit 0"
            bat "docker rm todo || exit 0"
            bat "docker run -d -p 3000:3000 --name todo %DOCKER_IMAGE%:${env.APP_VERSION}"
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
