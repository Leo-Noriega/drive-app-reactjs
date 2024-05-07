pipeline {
    agent {
        docker {
            image 'node:latest'
        }
    }
    stages {
        stage ('Install') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage ('Build') {
            steps {
                echo 'Building...'
                sh 'npm run build'
            }
        }
        stage ('Dev') {
            steps {
                echo 'Running dev server...'
                sh 'docker build -t myapp .'
                sh 'docker run -d -p 3030:80 myapp'
            }
        }
    }
}