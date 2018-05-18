"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
var observable_1 = require("data/observable");
var observable_decorator_1 = require("~/shared/observable-decorator");
//import { ActivatedRoute } from '@angular/router';
var SearchComponent = /** @class */ (function (_super) {
    __extends(SearchComponent, _super);
    function SearchComponent() {
        return _super.call(this) || this;
    }
    SearchComponent.prototype.ngOnInit = function () {
        // 	this.isLoading= true;
        // 	this.isAnonymous = BackendService.isAnonymous;
        // 	this.sub$ = this.route.params;
        // 	this.articles$ = this.sub$.switchMap((params: any) =&#x3E; {
        // 								this.categoryTitle = params[&#x27;categoryTitle&#x27;];
        // 								return &#x3C;any&#x3E;this.firebaseService.getArticleList(params[&#x27;id&#x27;])});&#x9;
        //    this.articles$.subscribe(()=&#x3E;{
        // 			 this.isLoading= false;
        //    });
    };
    __decorate([
        observable_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], SearchComponent.prototype, "message", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: './search/search.component.html',
            styleUrls: ['./search/search.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], SearchComponent);
    return SearchComponent;
}(observable_1.Observable));
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBd0Q7QUFDeEQsc0VBQW1FO0FBQ25FLG1EQUFtRDtBQVFuRDtJQUFxQyxtQ0FBVTtJQUs5QztlQUNDLGlCQUFPO0lBQ1AsQ0FBQztJQUVGLGtDQUFRLEdBQVI7UUFFQSx5QkFBeUI7UUFDekIsa0RBQWtEO1FBQ2xELGtDQUFrQztRQUNsQyxnRUFBZ0U7UUFDaEUsa0VBQWtFO1FBQ2xFLG9HQUFvRztRQUNwRyx5Q0FBeUM7UUFDekMsNkJBQTZCO1FBQzdCLFNBQVM7SUFDUixDQUFDO0lBakJGO1FBREMseUNBQWtCLEVBQUU7O29EQUNFO0lBSFgsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM1QyxDQUFDOztPQUVXLGVBQWUsQ0FxQjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXJCRCxDQUFxQyx1QkFBVSxHQXFCOUM7QUFyQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7IEV2ZW50RGF0YSwgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlUHJvcGVydHkgfSBmcm9tICd+L3NoYXJlZC9vYnNlcnZhYmxlLWRlY29yYXRvcic7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnc2VhcmNoJyxcblx0dGVtcGxhdGVVcmw6ICcuL3NlYXJjaC9zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBleHRlbmRzIE9ic2VydmFibGUgaW1wbGVtZW50cyBPbkluaXQgIHtcblxuXHRAT2JzZXJ2YWJsZVByb3BlcnR5KClcblx0cHVibGljIG1lc3NhZ2U6IHN0cmluZztcblx0XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdCB9XG5cblx0bmdPbkluaXQoKSB7XG5cblx0Ly8gXHR0aGlzLmlzTG9hZGluZz0gdHJ1ZTtcblx0Ly8gXHR0aGlzLmlzQW5vbnltb3VzID0gQmFja2VuZFNlcnZpY2UuaXNBbm9ueW1vdXM7XG5cdC8vIFx0dGhpcy5zdWIkID0gdGhpcy5yb3V0ZS5wYXJhbXM7XG5cdC8vIFx0dGhpcy5hcnRpY2xlcyQgPSB0aGlzLnN1YiQuc3dpdGNoTWFwKChwYXJhbXM6IGFueSkgPSYjeDNFOyB7XG5cdC8vIFx0XHRcdFx0XHRcdFx0XHR0aGlzLmNhdGVnb3J5VGl0bGUgPSBwYXJhbXNbJiN4Mjc7Y2F0ZWdvcnlUaXRsZSYjeDI3O107XG5cdC8vIFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJiN4M0M7YW55JiN4M0U7dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0QXJ0aWNsZUxpc3QocGFyYW1zWyYjeDI3O2lkJiN4Mjc7XSl9KTsmI3g5O1xuXHQvLyAgICB0aGlzLmFydGljbGVzJC5zdWJzY3JpYmUoKCk9JiN4M0U7e1xuXHQvLyBcdFx0XHQgdGhpcy5pc0xvYWRpbmc9IGZhbHNlO1xuXHQvLyAgICB9KTtcblx0IH1cbn0iXX0=