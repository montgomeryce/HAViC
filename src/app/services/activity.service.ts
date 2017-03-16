import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from "../models/activity";
import {ActivityData} from "../models/activity-data";

@Injectable()
export class ActivityService {

    //mock in-memory-db
    //private activitiesUrl = 'app/activities';
    private activitiesUrl = 'http://localhost:8080/activities';

    constructor(private http:Http) {
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    /**
     * method overloading in typescript/javascript is awkward at best...
     * Since the typescript is transpiled into javascript and javascript doesn't have method overloading this gets ugly.
     */
    getActivities();
    getActivities(sortBy?: string,direction?:string);
    getActivities(sortBy?: string, direction?:string, limit?:number);
    getActivities(sortBy?: string, direction?:string, limit?:number, page?:number);
    /**
     * 
     * @param sortBy
     * @param direction
     * @param limit // has to be under default size of the page(20) for now 
     * @returns {Promise<Activity[]>|Promise<void>}
     */
    getActivities(sortBy?: string, direction?:string, limit?:number,page?:number) {
    
        console.log('getActivities()', this.activitiesUrl);
        var query='?1=1';//hack to get around unknown first param
        if(page!=undefined && page >=0){
            query +='&page='+page;
        }
        if(sortBy!==undefined){
            query += '&sort='+sortBy+',' + (direction==='desc'?'desc':'asc');
        }
        if(limit!==undefined && limit>0){
            query +='&size='+limit;
        }

        if(limit!==undefined && limit>21){
            console.warn('limit is over the default page size. data will be limited to 20');
        }

        console.log(this.activitiesUrl + query);
        return this.http.get(this.activitiesUrl + query)
            .toPromise()
            //.then(data => data._body.data['_embedded'].activities as Activity[])
            //.then(data => data.json()._embedded.activities as Activity[])
            .then(data => data.json())
            .catch(this.handleError);
    }

    /**
     * Gets the recorded data for a given activity
     * @param id
     * @returns {Promise<void>|Promise<ActivityData[]>}
     */
    getActivityData(id: number) {
        console.log('getActivityData('+id+')');
        //return this.http.get('app/activities/'+id+'/data')
        return this.http.get('http://localhost:8080/activities/'+id+'/data')
            .toPromise()
            .then(data => data.json().data as ActivityData[])
            .catch(this.handleError);
    }

    /**
     * Gets an individual activity
     * @param id
     * @returns {Promise<void>|Promise<Activity>}
     */
    getActivity(id: number) {
        console.log('getActivity('+id+')');
        return this.http.get('http://localhost:8080/activities/'+id)
            .toPromise()
            .then(data => data.json() as Activity)
            .catch(this.handleError);
/*        return this.getActivities()
            .then(activities => activities.find(activity => activity.id === id));*/
    }
}