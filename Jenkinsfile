pipeline{
    environment {
        imagename = "oussama24/frontendapp"
        registryCredential = "dockerhub_credentials"
        dockerImage = 'frontendapp'
        scannerHome = tool 'SonarScanner 4.6.2'
    }
    agent any
    stages{

            
        
        stage('SonarQube analysis') {
                    
            steps{
//                         
                    withSonarQubeEnv('sonarqube-9.3') { 
        // If you have configured more than one global server connection, you can specify its name
                        sh "${scannerHome}/bin/sonar-scanner"
        }
      }
        }
        
        stage("build"){
            
            steps{
                sh 'npm install'
                sh 'npm run build'
            }
        }
//         stage('Login') {

// 			steps {
// 				sh 'echo $registryCredential_PSW | docker login -u $registryCredential_USR --password-stdin'
// 			}
// 		}
        
        stage("docker-build"){
            steps{
                    script {
                    dockerImage = docker.build imagename   
                    docker.withRegistry( '', registryCredential ) {
                    dockerImage.push("$BUILD_NUMBER")
                    dockerImage.push('latest')
                    }
                }
            }
        }
        stage("deploy"){
            steps{
                echo 'deployment'
            }
        }
    }
}
