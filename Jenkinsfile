pipeline{
    environment {
        imagename = "oussama24/frontendapp"
        registryCredential = "dockerhub_credentials"
        dockerImage = 'frontendapp'
    }
    agent any
    stages{

            
        
        stage('SonarQube analysis') {
                    
            steps{
                script {
               scannerHome = tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('sonarqube-server') { 
        
                       sh "${scannerHome}/bin/sonar-scanner"
                     
                    }
                }         
            }
        }
        
        stage("build"){
            
            steps{
                sh 'npm install'
                sh 'npm run build'
            }
        }
      
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
//         stage("deploy"){
//             steps{
//                 echo 'deployment'
//             }
//         }
        
        
        
        parallel {
                stage ('build with DRAFT') {
                    when { expression { return ( params.DO_BUILD_WITH_DRAFT_API ) } }
                    steps {
                      dir("tmp/build-withDRAFT") {
                        deleteDir()
                        unstash 'prepped'
                        sh """CCACHE_BASEDIR="`pwd`" ; export CCACHE_BASEDIR; if test "${params.USE_CCACHE_LOGGING}" = true ; then rm -f ccache.log ; CCACHE_LOGFILE="`pwd`/ccache.log" ; export CCACHE_LOGFILE ; fi ; ./configure --enable-drafts=yes --enable-Werror="${params.ENABLE_WERROR}" --with-docs=no"""
                        sh """CCACHE_BASEDIR="`pwd`" ; export CCACHE_BASEDIR; if test "${params.USE_CCACHE_LOGGING}" = true ; then CCACHE_LOGFILE="`pwd`/ccache.log" ; export CCACHE_LOGFILE ; fi ; make -k -j4 || make"""
                        sh """ echo "Are GitIgnores good after make with drafts?"; make CI_REQUIRE_GOOD_GITIGNORE="${params.CI_REQUIRE_GOOD_GITIGNORE}" check-gitignore """
                        stash (name: 'built-draft', includes: '**/*', excludes: '**/cppcheck.xml')
                        script {
                            if ( params.DO_CLEANUP_AFTER_BUILD ) {
                                deleteDir()
                            }
                        }
                      }
                    }
        
        
        
        
        
    }

