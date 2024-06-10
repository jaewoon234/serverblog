class LocalApi {
  constructor() {}

  getData = () => {
    return JSON.parse(localStorage.getItem("blogData"));
  };

  loadData = () => {
    if (!localStorage.getItem("blogData")) {
      // localStorage.setItem("login", JSON.stringify(false));
      this.blogData = {
        pjm5129: {
          name: "박정민",
          desc: "정미니 블로그",
          pw: "testjm",
          post: {},
        },
        jaewoon: {
          name: "정재운",
          desc: "테스트 서버",
          pw: "testjw",
          post: {
            1: {
              id: 1,
              title: "테스트 서버 #1",
              timestamp: 1717793896017,
              content: "테스트 서버",
              // likes: ["pjm5129", "jungmini"],
            },
            2: {
              id: 2,
              title: "테스트 서버 #2",
              timestamp: 1817793896017,
              content: "테스트 서버",
              // likes: [],
            },
            3: {
              id: 3,
              title: "테스트 서버 #3",
              timestamp: 24222345296017,
              content: "테스트 서버",
              // likes: ["jaewoon"],
            },
          },
        },
      };
      localStorage.setItem("blogData", JSON.stringify(this.blogData));
    } else {
      this.blogData = JSON.parse(localStorage.getItem("blogData"));
    }
  };

  saveData = () => {
    localStorage.setItem("blogData", JSON.stringify(this.blogData));
  };

  getBlogData = async (id) => {
    this.loadData();
    return this.blogData[id];
  };

  getPostList = async (id) => {
    this.loadData();
    return this.blogData[id].post;
  };

  login = async (id, pw) => {
    this.loadData();
    if (this.blogData[id]) {
      if (this.blogData[id].pw === pw) {
        localStorage.setItem("login", id);
        return true;
      }
    } else return false;
  };

  register = async (id, pw) => {
    this.loadData();
    if (this.blogData[id]) return false;

    this.blogData[id] = {
      name: id,
      desc: `${id}님의 블로그`,
      pw: pw,
      post: {},
    };

    this.saveData();

    return true;
  };

  logout = async () => {
    localStorage.removeItem("login");
    return true;
  };

  isLogin = async () => {
    return localStorage.getItem("login");
  };

  changeName = async (id, name) => {
    this.loadData();
    this.blogData[id].name = name;
    this.saveData();
    return true;
  };

  changeDesc = async (id, desc) => {
    this.loadData();
    this.blogData[id].desc = desc;
    this.saveData();
    return true;
  };

  editPost = async (id, postId, title, content) => {
    this.loadData();
    this.blogData[id].post[postId].title = title;
    this.blogData[id].post[postId].content = content;
    this.blogData[id].post[postId].edit = true;
    this.saveData();
    return true;
  };

  removePost = async (id, postId) => {
    this.loadData();
    delete this.blogData[id].post[postId];
    this.saveData();
  };

  writePost = async (title, content) => {
    this.loadData();
    if (await this.isLogin()) {
      const r = Math.floor(Math.random() * 999999999);
      this.blogData[await this.isLogin()].post[r] = {
        id: r,
        title: title,
        timestamp: Date.now(),
        content: content,
      };
      this.saveData();
      return r;
    }
  };

  getAllPosts = async () => {
    this.loadData();
    let result = [];
    for (let key of Object.keys(this.blogData)) {
      result = [
        ...result,
        ...Object.values(this.blogData[key].post).map((post) => {
          return { ...post, owner: key };
        }),
      ];
    }
    console.log(result);
    return result.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
  };
}

class ProductApi {}

const Api = new LocalApi();

export default Api;
