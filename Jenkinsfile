pipeline{
    environment {
        imagename = "oussama24/frontendapp"
        registryCredential = credentials('dockerhub_credentials')
        dockerImage = 'frontendapp'
//         def scannerHome = tool 'sonarqube-scanner'
    }
    agent any
    stages{
//         stage("test-sonar"){
//             steps{
//                 script {
//                     withSonarQubeEnv("sonarQube") {
//                     sh "${scannerHome}/bin/sonar-scanner \
//                         -Dsonar.projectKey=oussamaDevops \
//                         -Dsonar.sources=. \
//                         -Dsonar.host.url=http://localhost:9000 \
//                         -Dsonar.login=admin \
//                         -Dsonar.password=admin007"
//                     } 
//                 }
//             }
//         }
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
