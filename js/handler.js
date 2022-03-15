function handler() {
    return {
        'status': "Inactive",
        'process': "None",
        'concept': "",
        'input': "",
        'result': "",
        'resultArr': [],
        'clearText': "Exit",
        activateProcess(process, concept) {
            this.status = "Active";
            this.input = "";
            this.result = "";
            this.resultArr = [];
            this.clearText = "Exit";
            this.process = process;
            this.concept = concept;
        },
        inactivateProcess() {
            this.result = "";
            this.resultArr = [];

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
                    case "Similar Concept":
                        getRelated(this.input, 'ml').then(data => this.resultArr = data.slice(0,7));
                        break;
                    case "Commonly Used Adjectives":
                        getRelated(this.input, 'rel_jjb').then(data => this.resultArr = data.slice(0,7));
                        break;
                    case "Commonly Following Words":
                        getRelated(this.input, 'lc').then(data => this.resultArr = data.slice(0,7));
                        break;
                    case "Relevant Image": 
                        getRelevantImage(this.input).then(url => this.result = url);
                        break;
                }
            }
        }
    }
}

function getRelated(input, mode) {
    return new Promise(resolve => {
        fetch(`http://localhost:4758/phrases?input=${input}&mode=${mode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${reponse.status}`)
            }
            return response.json()
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => console.log(error))
    });    
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