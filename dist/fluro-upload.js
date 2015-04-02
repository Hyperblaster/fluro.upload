
//Create Fluro UI With dependencies
angular.module('fluro.upload', [
	'fluro.config',
    'angularFileUpload',
	]);
angular.module('fluro.upload')

.factory('FluroUploader', function(FileUploader, $rootScope, CacheManager, Fluro) {


    var controller = {}

    //////////////////////////////////////////////////

    controller.UPLOAD_COMPLETE = 'upload.complete';

    /////////////////////////////////

    controller.metaData = {}

    /////////////////////////////////

    /*
    controller.uploader = new FileUploader({
        url: Fluro.apiURL+'/file/upload',
        removeAfterUpload:true,
        withCredentials:true,
        formData: {
            options: controller.meta,
        }
    });

*/
    /////////////////////////////////

    controller.uploader = new FileUploader({
        url: Fluro.apiURL + '/file/replace',
        removeAfterUpload: true,
        withCredentials: true,
        formData: {},
    });

    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    controller.uploader.onCompleteItem = function(fileItem, response, status, headers) {

        //Clear the asset caches
        CacheManager.clear('image');
        CacheManager.clear('asset');
        CacheManager.clear('audio');
        CacheManager.clear('video');

        //Dispatch event to the rest of the application
        $rootScope.$broadcast(controller.UPLOAD_COMPLETE);
    };

    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    
    
    controller.uploader.onBeforeUploadItem = function(item) {

       // item.removeAfterUpload = false;
        var details = {};

            /*
            if($scope.definition) {
                $scope.item.definition = $scope.definition.definitionName;
            }


            $scope.item.type = $scope.type.path;
            console.log('Create Item', $scope.type, $scope.item.type);

            
            details.json = angular.toJson($scope.item);
        }
        */
       
        details.json = angular.toJson(controller.metaData);
        item.formData = [details];

        console.log('SETUP UPLOAD ITEM', item)
    };

    //////////////////////////////////////////////////
/*
    controller.uploader.onBeforeUploadItem = function(item) {

        var details = {};

        details.tags = _.map(controller.meta.tags, function(tag) {
            if (_.isObject(tag)) {
                return tag._id
            } else {
                return tag;
            }
        });

        details.applications = ['bookbuilder'];

       

        details.realms = _.map(controller.meta.realms, function(realm) {
            if (_.isObject(realm)) {
                return realm._id
            } else {
                return realm;
            }
        });


        console.log('TESTING', details)

        item.formData = [details]


    

    };

    */

    /////////////////////////////////

    return controller;

    /////////////////////////////////




});