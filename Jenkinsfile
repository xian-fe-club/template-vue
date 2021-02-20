node {
    def user = ' '
    wrap([$class: 'BuildUser']) {
      user = env.BUILD_USER
    }
    def opts = "tag:${BRANCH},build_parameter:${build_parameter},deploy_env:${deploy_env}"

    def job_names = "$JOB_NAME".split('-')
    if (job_names.size() != 2) {
      println("job的名字必须是 项目名-服务名格式， 有且仅有一个-")
    }
    def project = job_names[0]
    def service = job_names[1]
    def version = "$BRANCH"
    if (version.split('/').size() != 1) {
      version = "0.0.${BUILD_NUMBER}"
    }

    def docker_image = "registry.enbrands.com/${project}/${service}:${version}"
    def docker_name = "${JOB_NAME}".replace(".", "_")

    try {
        stage('Check out') {
            checkout scm
        }
        // maven 代码构建
        stage('Install&&Build') {
              sh("npm set registry https://npm.enbrands.com")
              sh("npm config set always-auth=true")
              sh("npm install")
              if (build_parameter == "prod") {
                sh("npm run build:prod")
                sh("npm run deploy:prod")
              } else if (build_parameter == "test") {
                sh("npm run build:debug")
                sh("npm run deploy:debug")
              } else if(build_parameter == "dev") {
                sh("npm run build")
                sh("npm run deploy")
              } else {
                println("参数错误")
              }
        }

        // docker 镜像构建 push
        stage('Docker build') {
            sh("docker -H tcp://127.0.0.1:2376 build -t ${docker_image} .")
            sh("docker -H tcp://127.0.0.1:2376 push ${docker_image}")
        }

        stage('Deploy') {

           //定义部署机器
           def deployNodes = [
             'dev': ['172.16.0.121'],
             'test': ['172.16.0.121']
           ]
           def node = []
           if(deploy_env in deployNodes) {
              node = deployNodes[deploy_env]
           }
           for(IP in node ) {
             try {
               sh("ssh ${IP} docker rm -f ${docker_name}")
             }  catch (err) {
               echo "not exist old contains"
             }
             sh("ssh ${IP} docker run -d --name ${docker_name} ${docker_image}")
             if( deploy_env == "dev") {
               sh("ssh ${IP} docker cp ${docker_name}:/data/index.html /data/nodejs/${JOB_NAME}/dev_html/index.html")
               sh("ssh ${IP} docker rm -f ${docker_name}")
      
             } else if ( deploy_env == "test") {
               sh("ssh ${IP} docker cp ${docker_name}:/data/index.html /data/nodejs/${JOB_NAME}/html/index.html")
               sh("ssh ${IP} docker rm -f ${docker_name}")
             }
           }
        }
        stage('Cleanup') {
            try {
                sh("docker -H tcp://127.0.0.1:2376 rmi ${docker_image}")
            } catch (err) {
                echo "清理失败"
            }

        }
    } catch (err) {
        sh("bash /var/jenkins_home/dingding/mme/printdingding.sh ${user} ${JOB_NAME} '${opts}' failure")
        currentBuild.result = "FAILURE"
        throw err

    }
    sh("bash /var/jenkins_home/dingding/mme/printdingding.sh ${user} ${JOB_NAME} '${opts}' success")
    currentBuild.result = "SUCCESS"
}
