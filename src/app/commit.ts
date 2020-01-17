export class Commit {

    commiterName: string;
    commiterEmail: string;
    commitSha: string;
    commitId: string;
    commitMsg: string;
    commitDay: Date;
    commitTime: Date;
    commitUrl: string;

    constructor() {
        this.commitId = "0";
        this.commitMsg = "none";
        this.commitUrl = "";
    }
}