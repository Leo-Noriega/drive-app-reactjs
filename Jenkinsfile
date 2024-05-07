pipeline {
    agent {
        docker {
            image 'node:14'
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
                sh 'npm run dev'
            }
        }
    }
}