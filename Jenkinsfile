#!groovy

library identifier: '3scale-toolbox-jenkins@master', retriever: modernSCM([$class: 'GitSCMSource', credentialsId: '', remote: 'https://github.com/rh-integration/3scale-toolbox-jenkins.git', traits: [gitBranchDiscovery()]])

def service = null

node() {
    stage("checkout") {
        checkout scm
    }

    stage("Prepare") {
        service = toolbox.prepareThreescaleService(
            openapi: [filename: params.PARAMS_OPENAPI_SPEC],
            environment: [ baseSystemName: params.APP_NAME,
                           oidcIssuerEndpoint: params.OIDC_ISSUER_ENDPOINT,
    					   privateBaseUrl: params.PRIVATE_URL],
            toolbox: [ openshiftProject: params.OCP_PROJECT,
                       destination: params.INSTANCE,
                       insecure: "yes",
                       image: "quay.io/redhat/3scale-toolbox:v0.17.1",
                       secretName: params.SECRET_NAME],
            service: [:],
            applications: [
                [ name: "my-test-app", description: "This is used for tests", plan: "test", account: 27 ]
            ],
            applicationPlans: [
              [ systemName: "test", name: "Test", defaultPlan: true, published: true ],
              [ systemName: "silver", name: "Silver" ],
              [ systemName: "gold", name: "Gold" ],
            ]
        )
        echo "toolbox version = " + service.toolbox.getToolboxVersion()
    }

    stage("Import OpenAPI") {
        service.importOpenAPI()
        echo "Service with system_name ${service.environment.targetSystemName} created !"
    }

    stage("Create an Application Plan") {
        service.applyApplicationPlans()
    }

    stage("Create an Application") {
        service.applyApplication()
    }

//     stage("Run integration tests") {
//         // To run the integration tests when using APIcast SaaS instances, we need
//         // to fetch the proxy definition to extract the staging public url
//           sh """set -e
//           echo "aqui teste"
//           """
//          def proxy = service.readProxy("sandbox")
//          sh """set -e
//          echo "aqui teste2"
//          """
// //         def userkey = service.applications[0].userkey
//         def tokenEndpoint = getTokenEndpoint(params.OIDC_ISSUER_ENDPOINT)
//          sh """set -e
//          echo "aqui teste2"
//          """
//         def clientId = "3scale-admin"
//         def clientSecret = "b4d27172-27d1-4854-a034-48b42b15e283"
//
// /*
//         sh """set -e
//         echo "Public Staging Base URL is ${proxy.sandbox_endpoint}"
//         echo "userkey is ${userkey}"
//         curl -sfk -w "Get Items: %{http_code}\n" -o /dev/null ${proxy.sandbox_endpoint}${TEST_ENDPOINT} -H 'api-key: ${userkey}'
//
//         """
//         */
//
//         sh """set -e
//         echo "Public Staging Base URL is ${proxy.sandbox_endpoint}"
//         echo "userkey is ${userkey}"
//         curl -sfk "${tokenEndpoint}" -d client_id="${clientId}" -d client_secret="${clientSecret}" -d scope=openid -d grant_type=client_credentials -o response.json
//         curl -sLfk https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -o /tmp/jq
//         chmod 755 /tmp/jq
//         TOKEN="\$(/tmp/jq -r .access_token response.json)"
//         echo "Received access_token '\$TOKEN'"
//         curl -sfk -w "Get Items: %{http_code}\n" -o /dev/null ${proxy.sandbox_endpoint}${TEST_ENDPOINT} -H 'Authorization: \$TOKEN'
//
//         """
//
//     }


    stage("Promote to production") {
        service.promoteToProduction()
    }
}

def getTokenEndpoint(String oidcIssuerEndpoint) {
   def m = (oidcIssuerEndpoint =~ /(https?:\/\/)[^:]+:[^@]+@(.*)/)
   return "${m[0][1]}${m[0][2]}/protocol/openid-connect/token"
}