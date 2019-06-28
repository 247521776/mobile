def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, cloud: 'kubernetes',
    containers: [
        containerTemplate(name: 'wtctl', image: 'worktile/wtctl:1.0', ttyEnabled: true, command: 'cat')
    ],
    volumes: [
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
        hostPathVolume(mountPath: '/tmp/cache', hostPath: '/tmp/cache/wt-rd-pipeline'),
        hostPathVolume(mountPath: '/root/.ssh', hostPath: '/root/.ssh')
    ]
) {
    node(label) {

        def scmVars = checkout scm

        def commit = scmVars.GIT_COMMIT
        def branch = scmVars.GIT_BRANCH

        def project= "mobile";
        def workDir = ""

        stage('Run Publish') {
            script {
                container('wtctl') {
                    sh "wtctl --token=f43b59f3-81bb-4c29-b8f0-6e7558dc0e39"
                }
            }
        }
    }
}
