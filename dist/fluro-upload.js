
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
        removeAfterUpload: false,
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
    /////////////////////////////////

    return controller;

    /////////////////////////////////




});