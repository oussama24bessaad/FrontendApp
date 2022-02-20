pipeline{
    environment {
        imagename = "oussama24/frontendapp"
        registryCredential = "dockerhub_credentials"
        dockerImage = 'frontendapp'
        
    }
    agent any
    stages{
//         stage("SonarQube analysis"){
//             steps{
//                 script {
//                     scannerHome = tool 'SonarQube Scanner 4.6.2.2472'
//                 }
//                     withSonarQubeEnv("SonarQube Scanner") {
//                     sh "${scannerHome}/bin/sonar-scanner \
//                         -Dsonar.projectKey=oussamaDevops \
//                         -Dsonar.sources=. \
//                         -Dsonar.host.url=http://localhost:9000 \
//                         -Dsonar.login=admin \
//                         -Dsonar.password=admin007"
//                     } 
//                 }
            
//         }
        
        stage('SonarQube analysis') {
                    
            steps{
                scrip
                {
                scannerHome = tool 'SonarQube Scanner 4.6.2';
                }
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
