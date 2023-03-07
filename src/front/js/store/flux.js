const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      is_org: null,
      avatarID: null,
      // each time you open a new environment,check to make sure this is the same URL
      // front URL is port 3000
      current_front_url:
        "https://3000-lalafontaine-alive-rrq3flm0v8z.ws-us89b.gitpod.io",
      // back URL is port 3001
      current_back_url:
        "https://3001-lalafontaine-alive-rrq3flm0v8z.ws-us89b.gitpod.io",

      avatarImages: [
        "https://static.vecteezy.com/system/resources/previews/006/940/182/original/simple-minimalist-cute-dog-cartoon-illustration-drawing-premium-vector.jpg",
        "https://rlv.zcache.co.nz/beagle_puppy_dog_cartoon_love_beagles_stickers-r3e13c31e5cf44f388ad8e771530ada13_0ugmc_8byvr_736.jpg", 
        "https://cdn.shopify.com/s/files/1/0300/9124/7748/products/mockup-6fab90ef_1200x1200.jpg?v=1581906930",
        "https://img.freepik.com/premium-vector/cute-beagle-puppies-cartoon-icon-illustration_665569-21.jpg",
        "https://img.freepik.com/free-vector/cute-corgi-dog-eating-bone-cartoon_138676-2534.jpg?w=360",
        "https://img.freepik.com/premium-vector/cute-corgi-dog-jumping-flat-cartoon-style_138676-2622.jpg",
      ]
    },
    actions: {
      // Use getActions to call a function within a fuction
      login: async (email, password) => {
        const current_back_url = getStore().current_back_url;
        const current_front_url = getStore().current_front_url;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const response = await fetch(current_back_url + "/api/login", opts);
          if (response.status !== 200) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          console.log(data);
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("is_org", data.is_org);
          setStore({ token: data.access_token, is_org: data.is_org, avatarID:data.avatar });
          console.log(getStore().avatarID);
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      createUser: async (is_org, name, email, password, userAvatar) => {
        const current_back_url = getStore().current_back_url;
        const current_front_url = getStore().current_front_url;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            is_org: is_org,
            name: name,
            email: email,
            password: password,
            userAvatar: userAvatar,
          }),
        };
        try {
          const response = await fetch(
            current_back_url + "/api/createUser",
            opts
          );
          if (response.status >= 400) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          if (data.status == "true") {
            // window.location.href = current_front_url + "/login";
          }
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      logout: () => {
        const current_front_url = getStore().current_front_url;
        const token = sessionStorage.removeItem("token");
        const is_org = sessionStorage.removeItem("is_org");
        setStore({ token: null, is_org: null });
        window.location.href = current_front_url + "/";
      },
      // createOrganization: async (name, email, password) => {
      //   const current_back_url = getStore().current_back_url;
      //   const current_front_url = getStore().current_front_url;
      //   const opts = {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //     body: JSON.stringify({
      //       name: name,
      //       email: email,
      //       password: password,
      //     }),
      //   };
      //   try {
      //     const response = await fetch(
      //       current_back_url + "/api/createOrganization",
      //       opts
      //     );
      //     if (response.status >= 400) {
      //       alert("There has been an error");
      //       return false;
      //     }
      //     const data = await response.json();
      //     if (data.status == "true") {
      //       window.location.href = current_front_url + "/loginOrganization";
      //     }
      //     return true;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // },
      // loginOrganization: async (email, password) => {
      //   const current_back_url = getStore().current_back_url;
      //   const opts = {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //     body: JSON.stringify({
      //       email: email,
      //       password: password,
      //     }),
      //   };
      //   try {
      //     const response = await fetch(
      //       current_back_url + "/api/loginOrganization",
      //       opts
      //     );
      //     if (response.status !== 200) {
      //       alert("There has been an error");
      //       return false;
      //     }
      //     const data = await response.json();
      //     sessionStorage.setItem("token", data.access_token);
      //     setStore({ token: data.access_token });
      //     return true;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // },
      createResource: async (name, schedule, website, phone, address) => {
        const current_back_url = getStore().current_back_url;
        const current_front_url = getStore().current_front_url;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            schedule: schedule,
            website: website,
            phone: phone,
            address: address,
          }),
        };
        try {
          const response = await fetch(
            current_back_url + "/api/createResource",
            opts
          );
          if (response.status >= 400) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          if (data.status == "true") {
            window.location.href = current_front_url + "/";
          }
          return true;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;

// A betterrrrrrrrrrr commment ;)

// Testing for github - Mara
