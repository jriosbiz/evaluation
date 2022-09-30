
const Api = (() => {
 const baseUrl = 'https://randomuser.me/api';
 const result = '?results=20';

 const getPeople = () =>
     fetch([baseUrl, result].join("/")).then((response) =>
         response.json()
     )
     //.then((data) => console.log(data))

 return { getPeople };
})()

const View = (() => {
	const domstr = {
        list: ".list",
        //data: ".data",
        //cards: ".cards",
		//personInfo: "#personInfo",
        //personPhoto: "#photo",
	};
	const render = (ele, tmp) => {
		ele.innerHTML = tmp;
	};
    
	const createTmp = (arr) => {
		let tmp = "";
		arr.results.forEach((ele) => {
			tmp += `
            <div class="data">
            <img src="${ele.picture.medium}" alt="x">
            <ul id="personInfo">
            <li>Name: ${ele.name.first}</li>
            <li>E-mail: ${ele.email}</li>
            <li>Phone: ${ele.phone}</li>
            <li>Birthday: ${ele.dob.date}</li>
            </ul>
            </div>
            `;
		});
		return tmp;
	};


	return { render, createTmp, domstr };
})();

/////////////////////////////////

const Model = ((api, view) => {
	const { getPeople } = api;

	class State {
		#peoplelist = [];

		get peoplelist() {
			return this.#peoplelist;
		}

        set peoplelist(newpeoplelist) {
			this.#peoplelist = newpeoplelist;

			const todolistContainer = document.querySelector(
				view.domstr.list
			);
			const tmp = view.createTmp(this.#peoplelist);
			view.render(todolistContainer, tmp);
		}
	}

	return { getPeople, State };
})(Api, View);

////////////////

const Controller = ((model) => {
	const state = new model.State();	

	const init = () => {
		model.getPeople().then((todos) => {
			state.peoplelist = todos;
		});
	};

	const bootstrap = () => {
		init();
	};

	return { bootstrap };
})(Model, View);

Controller.bootstrap();


// reload
// array -> result[20]
// result[8] always display at end of the screen when refresh
// assign new button at result[8] and style for the reload button


