function handler() {
    return {
        'status': "Inactive",
        'process': "None",
        'concept': "",
        'input': "",
        'result': "",
        'clearText': "Exit",
        activateProcess(process, concept) {
            this.status = "Active";
            this.input = "";
            this.result = "";
            this.clearText = "Exit";
            this.process = process;
            this.concept = concept;
        },
        inactivateProcess() {
            this.result = "";

            if(this.input == "") {
                this.status = "Inactive";
                this.process = "None";
                this.concept = "";
            }
            else {
                this.input = "",
                this.clearText = "Exit"
            }
        },
        checkInput() {
            if(this.clearText != "Clear" && this.input != "") {
                this.clearText = "Clear";
            }
        },
        getResult() {
            if(this.input != "") {
                switch(this.process) {
                    case "Relevant Image": 
                        this.result = getRelevantImage(this.input);
                        break;
                    default:
                        this.result = "Test";
                }
            }
        }
    }
}

function getRelevantImage(input) {
    return "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";
}