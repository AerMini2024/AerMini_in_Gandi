const aermini_embed_picture = "https://aermini.nmslcnm.cn/kz/bg.png";

const aermini_embed_icon = "https://aermini.nmslcnm.cn/kz/logo.png";

const aermini_embed_extensionId = "AerUrlmp4";

/** @typedef {string|number|boolean} SCarg 来自Scratch圆形框的参数，虽然这个框可能只能输入数字，但是可以放入变量，因此有可能获得数字、布尔和文本（极端情况下还有 null 或 undefined，需要同时处理 */

class AerUrlmp4 {
    constructor(runtime) {
        this.runtime = runtime;

        this._formatMessage = runtime.getFormatMessage({
            "zh-cn": {
                "AerUrlmp4.name": "视频嵌入",
                "AerUrlmp4.list1": "创建",
                "AerUrlmp4.list2": "控制",
                "AerUrlmp4.create": "创建ID[tableid]从url[url]于x[tablex]y[tabley] 大小w[tablesw]h[tablesh]",
                "AerUrlmp4.delete": "删除ID[tableid]的视频",
                "AerUrlmp4.backplay": "ID[tableid]的视频正在播放？",
                "AerUrlmp4.getid": "获得ID[tableid]的[type]",
                "AerUrlmp4.getplayingid": "获得正在播放的视频ID",
                "AerUrlmp4.mtablex": "x",
                "AerUrlmp4.mtabley": "y",
                "AerUrlmp4.mwidth": "宽",
                "AerUrlmp4.mheight": "高",
            },
            en: {
                "AerUrlmp4.name": "MP4 Embedding",
                "AerUrlmp4.list1": "Creation",
                "AerUrlmp4.list2": "Control",
                "AerUrlmp4.create": "create ID[tableid] from url[url] to x[tablex]y[tabley] size w[tablesw]h[tablesh]",
                "AerUrlmp4.delete": "delete the video with ID [tableid]",
                "AerUrlmp4.backplay": "a video with ID [tableid] is playing?",
                "AerUrlmp4.getid": "get the [type] of [tableid]",
                "AerUrlmp4.getplayingid": "get the ID of the video being played",
                "AerUrlmp4.mtablex": "x",
                "AerUrlmp4.mtabley": "y",
                "AerUrlmp4.mwidth": "width",
                "AerUrlmp4.mheight": "height",
            }
        })
    }

    /**
     * 翻译
     * @param {string} id
     * @return {string}
     */
    formatMessage(id) {
        return this._formatMessage({
            id,
            default: id,
            description: id
        });
    }
    

    getInfo() {
        return {
            id: aermini_embed_extensionId, // 拓展id
            name: this.formatMessage("AerUrlmp4.name"), // 拓展名
            blockIconURI: aermini_embed_icon,
            menuIconURI: aermini_embed_icon,
            color1: "#FFE1FF",
            color2: "#FFAEB9",
            blocks: [
                {
                    blockType: "button",
                    text: this.formatMessage('AerUrlmp4.docs'),
                    onClick: this.docs,
                },
                "---" + this.formatMessage("AerUrlmp4.list1"), // 创建
                // 创建ID为_ url_ x_ y_ w_ h_ bgurl_
                {
                    opcode: "create",
                    blockType: "command",
                    text: this.formatMessage("AerUrlmp4.create"),
                    arguments: {
                        tableid: {
                            type: "string",
                            defaultValue: "ID",
                        },
                        url: {
                            type: "string",
                            defaultValue: "https://example.com/file.mp4",
                        },
                        tablex: {
                            type: "number",
                            defaultValue: "0",
                        },
                        tabley: {
                            type: "number",
                            defaultValue: "0",
                        },
                        tablesw: {
                            type: "number",
                            defaultValue: "0",
                        },
                        tablesh: {
                            type: "number",
                            defaultValue: "0",
                        },
                    },
                },
                // 删除ID为_
                {
                    opcode: "delete",
                    blockType: "command",
                    text: this.formatMessage("AerUrlmp4.delete"),
                    arguments: {
                        tableid: {
                            type: "string",
                            defaultValue: "ID",
                        },
                    },
                },
                "---" + this.formatMessage("AerUrlmp4.list2"), // 控制
                // ID为_ 正在播放?
                {
                    opcode: "backplay",
                    blockType: "Boolean",
                    text: this.formatMessage("AerUrlmp4.backplay"),
                    arguments: {
                        tableid: {
                            type: "string",
                            defaultValue: "ID",
                        },
                    },
                },
                // 获取ID_ 的 (属性)
                {
                    opcode: "getid",
                    blockType: "reporter",
                    text: this.formatMessage("AerUrlmp4.getid"),
                    arguments: {
                        tableid: {
                            type: "string",
                            defaultValue: "ID",
                        }
                    	type: {
                    		type: "string",
                            menu: "getids",
                    	}
                    },
                },
                // 获取正在播放的ID_
                {
                    opcode: "getplayingid",
                    blockType: "reporter",
                    text: this.formatMessage("AerUrlmp4.getplayingid"),
                    arguments: {},
                },
            ],
            menus: {
            	// 获取ID属性的 菜单，该内容包含(url)、(x)、(y)、(width)、(height)
				getids: [
					{
						text: this.formatMessage("AerUrlmp4.mtablex"),
						value: "x",
					},
					{
						text: this.formatMessage("AerUrlmp4.mtabley"),
						value: "y",
					},
					{
						text: this.formatMessage("AerUrlmp4.mwidth"),
						value: "width",
					},
					{
						text: this.formatMessage("AerUrlmp4.mheight"),
						value: "height",
					},
				],
			},
        };
    }

    // 打开教程按钮实现，来源于 白猫
    docs() {
        let a = document.createElement('a');
        a.href = "https://www.ccw.site/";
        a.rel = "noopener noreferrer";
        a.target = "_blank";
        a.click();
    }
    
    // 创建ID为_的视频并设置一系列属性
    create(args) {
    	let x = Number(args.tablex);
    	let y = Number(args.tabley);
    	let width = Number(args.tablesw);
    	let height = Number(args.tablesh);
    	let url = args.url;
    	let id = args.tableid;
	    x = (x / this.runtime.stageWidth) * 100;
		y = (y / this.runtime.stageHeight) * 100;
		width = (width / this.runtime.stageWidth) * 100;
		height = (height / this.runtime.stageHeight) * 100;
		if (
			String(url).indexOf("ccw") !== -1 ||
			String(url).indexOf("xiguacity") !== -1 ||
			String(url).indexOf("aermini") !== -1 ||
            String(url).indexOf("bilibili") !== -1 ||
            String(url).indexOf("douyin") !== -1 ||
            String(url).indexOf("acfun") !== -1 ||
			String(url).startsWith("linear-gradient")
		) {
			url = `url("${encodeURI(String(url))}")`;
		} else {
			console.warn("该链接不存在于白名单中\nThe URL does not exist in the whitelist");
            url = "";
		}
        var videoElement = document.createElement('video');
        videoElement.setAttribute('id', id);
        videoElement.src = url; // 视频url
        videoElement.controls = false; // 显示播放控件，这里默认隐藏，可通过其他积木来显示
        videoElement.autoplay = true; // 自动播放，这里默认开启
        videoElement.muted = false; // 控制静音，这里默认关闭
        videoElement.loop = false; // 循环播放，这里默认关闭
        videoElement.style.position = 'absolute';
        videoElement.style.top = y; // 视频框y
        videoElement.style.left = x; // 视频框x
        videoElement.style.width = String(width) + 'px'; // 视频框宽
        videoElement.style.height = String(height) + 'px'; // 视频框高
        var container = document.getElementById('stage-canvas-wrapper');
        container.appendChild(videoElement); // 插入到舞台
    }

    // 删除ID为_的视频
    delete(args) {
    	let id = args.tableid;
        var videoElement = document.getElementById(id);
        if (videoElement) {
            var parentElement = videoElement.parentNode;
            if (parentElement) {
                parentElement.removeChild(videoElement);
            } else {
                console.warn('没有找到视频父元素(请截图上报至扩展作者)\nCould not find the parent element of the video');
            }
        } else {
        console.warn('没有找到指定ID的视频\nNo video element found with the specified ID');
        }
    }

    /**
	 * @param {string} id
	 * @returns {string}
	 */
    // 返回ID为_的视频是否在播放
    backplay(args) {
    	let id = args.tableid;
        var videoElement = document.getElementById(id);
        if (videoElement) {
            return !videoElement.paused;
        } else {
            return false;
        }
    }

    /**
	 * @param {string} id
	 * @returns {number|string}
	 */
    // 返回ID_的属性 
    getid(args) {
    	let id = args.tableid;
        var videoElement = document.getElementById(id);

        if (videoElement) {
            var rect = videoElement.getBoundingClientRect();
            if (args.type = "x") {
                return rect.left;
            } else {
                return rect.top
            }
        } else {

            var videoElement = document.getElementById(id);

            if (videoElement) {
                if (args.type = "width") {
                    return videoElement.offsetWidth;
                } else {
                    return videoElement.offsetHeight;
                }
            } else {
                return "";
            }
        }
    }

	/**
	 * @returns {number|string}
	 */
	// 获取所有正在播放视频的ID
	getplayingid () {
		function getPlayingVideoIds(containerId) {
            var containerDiv = document.getElementById(containerId);
            if (!containerDiv) {
                console.warn('No container div found with the specified ID.');
                return [];
            }
            var videosInDiv = containerDiv.querySelectorAll('video');
            var playingVideoIds = [];
            for (var i = 0; i < videosInDiv.length; i++) {
                if (!videosInDiv[i].paused) {
                    playingVideoIds.push(videosInDiv[i].id);
                }
            }
            return playingVideoIds;
        } 

        var containerId = 'stage-canvas-wrapper';
        var playingIds = getPlayingVideoIds(containerId);
        if (playingIds.length > 0) {
            return playingIds;
        } else {
            return "";
        }
	}
}

// CCW特有扩展介绍
window.tempExt = {
    Extension: AerUrlmp4,
    info: {
        name: "AerUrlmp4.name",
        description: "AerUrlmp4.descp",
        extensionId: aermini_embed_extensionId,
        iconURL: aermini_embed_picture,
        insetIconURL: aermini_embed_icon,
        featured: true,
        disabled: false,
        collaborator: "AerMini @ CCW"
    },
    l10n: {
        "zh-cn": {
            "AerUrlmp4.name": "视频嵌入",
            "AerUrlmp4.descp": "作品终于能播放自定义视频辣~"
        },
        en: {
            "AerUrlmp4.name": "Video Embedding",
            "AerUrlmp4.descp": "The stage is finally able to play custom videos~"
        }
    }
};
