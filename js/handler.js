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
                        getRelevantImage(this.input).then(url => this.result = url);
                        break;
                    default:
                        this.result = "Test";
                }
            }
        }
    }
}

function getRelevantImage(input) {
    return new Promise(resolve => {
        fetch(`https://wikimedia-image-scraper.herokuapp.com/get_image_url/?word=${input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${reponse.status}`)
            }
            return response.json()
        })
        .then(data => {
            resolve(data.IMAGE_URL);
        })
        .catch(error => console.log(error))
    });
}