pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
              nodeJS('nodeJS install')
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
