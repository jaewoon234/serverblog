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
          desc: "귀요미 재우니의 큐티뽀짝 블로그~~^^",
          pw: "testjw",
          post: {
            1: {
              id: 1,
              title: "재우니 일기 #1",
              timestamp: 1717793896017,
              content:
                "안녕하세요 일기입니다.\n 오늘은 날씨가 좋네요. \n시발 좆같은 학교. \n시험. 인생. 양파까지~~ 딴따따라단.\n 와퍼가 최고지",
              // likes: ["pjm5129", "jungmini"],
            },
            2: {
              id: 2,
              title: "재우니 일기 #2",
              timestamp: 1817793896017,
              content:
                "안녕하세요 일기입니다.\n 오늘은 날씨가 좋네요. \n시발 좆같은 학교. \n시험. 인생.시발. 야호 무야호 무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호무우우우야아아아앙호호호호호 하ㅏㅎ하하하ㅏ.\n 참깨빵 위에 순쇠고기 패티두장 특별한 소스 양상추 치즈 피클 양파까지~~ 딴따따라단.\n 와퍼가 최고지",
              // likes: [],
            },
            3: {
              id: 3,
              title: "재우니 일기 #3",
              timestamp: 24222345296017,
              content:
                "안녕하세요 일기입니다.\n 오늘은 날씨가 좋네요. \n시발 좆같은 학교. \n시험. 인생.시발. 야호 무야호 무우우우야아아아앙호호호호호 하ㅏㅎ하하하ㅏ.\n 참깨빵 위에 순쇠고기 패티두장 특별한 소스 양상추 치즈 피클 양파까지~~ 딴따따라단.\n 와퍼가 최고지",
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

  logout = async () => {
    localStorage.removeItem("login");
    return true;
  };

  isLogin = async () => {
    return localStorage.getItem("login");
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
