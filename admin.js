var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('Inmar')
    .baseApiUrl('http://149.56.237.37:8000/api/v1/'); 
    var location = nga.entity('location');
    location.listView().fields([
        nga.field('id'),
        nga.field('name').isDetailLink(true),
        nga.field('created_at'),
        nga.field('updated_at'),
    ]);

    location.creationView().fields([
        nga.field('name'),
    ]);

    location.editionView().fields(location.creationView().fields());
    
    admin.addEntity(location);

    var department = nga.entity('department');
    department.listView().fields([
        nga.field('id'),
        nga.field('name').isDetailLink(true),
        nga.field('location.name').label('Location'),
        nga.field('created_at'),
        nga.field('updated_at'),
    ]);

    department.creationView().fields([
        nga.field('name'),
        nga.field('location', 'reference')
          .label('Location')
          .targetEntity(location)
          .targetField(nga.field('name')),
    ]);

    department.editionView().fields([
        nga.field('name'),
        nga.field('location.id', 'reference')
          .label('Location')
          .targetEntity(location)
          .targetField(nga.field('name')),
    ]);

    admin.addEntity(department);

    var category = nga.entity('category');
    category.listView().fields([
        nga.field('id'),
        nga.field('name').isDetailLink(true),
        nga.field('department.location.name').label('Location'),
        nga.field('department.name').label('Department'),
        nga.field('created_at'),
        nga.field('updated_at'),
    ]);

    category.creationView().fields([
        nga.field('name'),
        nga.field('department', 'reference')
          .label('Department')
          .targetEntity(department)
          .targetField(nga.field('name')),
    ]);

    category.editionView().fields([
        nga.field('name'),
        nga.field('department.id', 'reference')
          .label('Department')
          .targetEntity(department)
          .targetField(nga.field('name')),
    ]);

    admin.addEntity(category);

    var subcategory = nga.entity('subcategory');
    subcategory.listView().fields([
        nga.field('id'),
        nga.field('name').isDetailLink(true),
        nga.field('category.department.location.name').label('Location'),
        nga.field('category.department.name').label('Department'),
        nga.field('category.name').label('Category'),
        nga.field('created_at'),
    ]);

    subcategory.creationView().fields([
        nga.field('name'),
        nga.field('category', 'reference')
          .label('Category')
          .targetEntity(category)
          .targetField(nga.field('name')),
    ]);

    subcategory.editionView().fields([
        nga.field('name'),
        nga.field('category.id', 'reference')
          .label('Category')
          .targetEntity(category)
          .targetField(nga.field('name')),
    ]);

    admin.addEntity(subcategory);

    var flatdata = nga.entity('flatdata').label('Products');
    flatdata.listView().fields([
        nga.field('id'),
        nga.field('name').isDetailLink(true),
        nga.field('subcategory.category.department.location.name').label('Location'),
        nga.field('subcategory.category.department.name').label('Department'),
        nga.field('subcategory.category.name').label('Category'),
        nga.field('subcategory.name').label('Subcategory'),
        nga.field('created_at'),
    ]);

    flatdata.creationView().fields([
        nga.field('name'),
        nga.field('subcategory', 'reference')
          .label('Subategory')
          .targetEntity(subcategory)
          .targetField(nga.field('name')),
    ]);

    flatdata.editionView().fields([
        nga.field('name'),
        nga.field('subcategory.id', 'reference')
          .label('Subcategory')
          .targetEntity(subcategory)
          .targetField(nga.field('name')),
    ]);

    admin.addEntity(flatdata);

    data = "<div ng-include=\"'dashboard.html'\"></div>"
    admin.dashboard(nga.dashboard().template(data))
    /*.addCollection(nga.collection(flatdata)
        .title('Recent products')
        .perPage(5) 
        .fields([
            nga.field('name'),
            nga.field('created_at'),
        ])
        .sortField('created_at')
        .sortDir('DESC')
        .order(1) */
    

    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            if (params._page) {
                params._start = (params._page - 1) * params._perPage;
                params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            if (params._sortField) {
                params._sort = params._sortField;
                params._order = params._sortDir;
                delete params._sortField;
                delete params._sortDir;
            }
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: "" };
    });
}]);
