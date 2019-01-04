export class EventModel {
  public constructor(activity: string, comments: string, activityType: string) {
    this.activity = activity;
    this.comments = comments;
    this.activityType = activityType;
  }

  public activity: string = "";
  public comments: string = "";
  public activityType: string = "";
  public datetime: Date = new Date();

}