pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
              nodejs('nodeJS install')
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
