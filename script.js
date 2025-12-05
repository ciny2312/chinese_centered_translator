// 全局变量
let currentTab = 'translate';
let isTranslating = false;
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB (增加以支持 docx/pdf)
const SUPPORTED_TEXT_EXTS = ['.txt', '.md', '.srt', '.json', '.csv', '.xml', '.html', '.htm', '.rtf', '.log', '.docx', '.pdf'];

// 扩展的翻译数据库 - 基于英汉大辞典和古汉语常用字字典
const translationData = {
    // 中文到英文 - 扩展词汇
    'zh-en': {
        // 基础词汇
        '。': '.',
        '！': '！',
        '？': '？',
        '\n': '\n',
        '\r': '\r',
        '\r\n': '\r\n',
        '你': 'you ',
        '我': 'I ',
        '他': 'he ',
        '她': 'she ',
        '它': 'it ',
        '年':'year ',
        '月':'month ',
        '日':'day ',
        '我们': 'we ',
        '你们': 'you ',
        '他们': 'they ',
        '你好': 'hello ',
        '世界': 'world ',
        '翻译': 'translation ',
        '学习': 'study ',
        '语言': 'language ',
        '谢谢': 'thank you ',
        '再见': 'goodbye ',
        '朋友': 'friend ',
        '家庭': 'family ',
        '工作': 'work ',
        '学校': 'school ',
        '老师': 'teacher ',
        '学生': 'student ',
        '书': 'book ',
        '水': 'water ',
        '火': 'fire ',
        '山': 'mountain ',
        '海': 'sea ',
        '天': 'sky ',
        '地': 'earth ',
        '人': 'person ',
        '心': 'heart ',
        '爱': 'love ',
        '美': 'beautiful ',
        '好': 'good ',
        '大': 'big ',
        '小': 'small ',
        '高': 'high ',
        '低': 'low ',
        '快': 'fast ',
        '慢': 'slow ',
        '新': 'new ',
        '旧': 'old ',
        '多': 'many ',
        '少': 'few ',
        '是': 'is ',
        '不': 'not ',
        '有': 'have ',
        '无': 'without ',
        '来': 'come ',
        '去': 'go ',
        '看': 'look ',
        '听': 'listen ',
        '说': 'say ',
        '做': 'do ',
        '吃': 'eat ',
        '喝': 'drink ',
        '睡': 'sleep ',
        '走': 'walk ',
        '跑': 'run ',
        '坐': 'sit ',
        '站': 'stand ',
        '开': 'open ',
        '关': 'close ',
        '买': 'buy ',
        '卖': 'sell ',
        '给': 'give ',
        '拿': 'take ',
        '放': 'put ',
        '找': 'find ',
        '用': 'use ',
        '想': 'think ',
        '知道': 'know ',
        '明白': 'understand ',
        '帮助': 'help ',
        '需要': 'need ',
        '想要': 'want ',
        '喜欢': 'like ',
        '讨厌': 'hate ',
        '害怕': 'afraid ',
        '高兴': 'happy ',
        '难过': 'sad ',
        '生气': 'angry ',
        '担心': 'worry ',
        '希望': 'hope ',
        '梦想': 'dream ',
        '成功': 'success ',
        '失败': 'failure ',
        '努力': 'effort ',
        '坚持': 'persist ',
        '改变': 'change ',
        '进步': 'progress ',
        '发展': 'development ',
        '创新': 'innovation ',
        '传统': 'tradition ',
        '文化': 'culture ',
        '历史': 'history ',
        '未来': 'future ',
        '现在': 'now ',
        '过去': 'past ',
        '时间': 'time ',
        '空间': 'space ',
        '地方': 'place ',
        '城市': 'city ',
        '乡村': 'countryside ',
        '国家': 'country ',
        '政府': 'government ',
        '人民': 'people ',
        '社会': 'society ',
        '经济': 'economy ',
        '政治': 'politics ',
        '教育': 'education ',
        '科学': 'science ',
        '技术': 'technology ',
        '艺术': 'art ',
        '音乐': 'music ',
        '电影': 'movie ',
        '体育': 'sports ',
        '健康': 'health ',
        '医疗': 'medical ',
        '食物': 'food ',
        '衣服': 'clothes ',
        '房子': 'house ',
        '汽车': 'car ',
        '飞机': 'airplane ',
        '火车': 'train ',
        '船': 'ship ',
        '钱': 'money ',
        '价格': 'price ',
        '价值': 'value ',
        '质量': 'quality ',
        '数量': 'quantity ',
        '大小': 'size ',
        '颜色': 'color ',
        '形状': 'shape ',
        '声音': 'sound ',
        '味道': 'taste ',
        '感觉': 'feeling ',
        '温度': 'temperature ',
        '天气': 'weather ',
        '季节': 'season ',
        '春天': 'spring ',
        '夏天': 'summer ',
        '秋天': 'autumn ',
        '冬天': 'winter ',
        '今天': 'today ',
        '明天': 'tomorrow ',
        '昨天': 'yesterday ',
        '早上': 'morning ',
        '中午': 'noon ',
        '晚上': 'evening ',
        '夜晚': 'night ',
        '星期': 'week ',
        '月份': 'month ',
        '年份': 'year ',
        '年龄': 'age ',
        '生日': 'birthday ',
        '节日': 'holiday ',
        '春节': 'Spring Festival',
        '中秋节': 'Mid-Autumn Festival',
        '国庆节': 'National Day',
        '圣诞节': 'Christmas',
        '新年': 'New Year',
        '如果': 'if ',
        '不能': 'cannot ',
        '学会': 'learn ',
        '以': 'with ',
        '平和的': 'peaceful ',
        '心态': 'mindset ',
        '面对': 'face ',
        '失败': 'failure ',
        '那么': 'then ',
        '你就': 'you will ',
        '永远': 'never ',
        '无法': 'be able to ',
        '实现': 'achieve ',
        '你的': 'your ',
        '抱负': 'ambition ',
        '并不意味着': 'does not mean ',
        '你是': 'you are ',
        '一个': 'a ',
        '失败者': 'loser ',
        '它': 'it ',
        '只是': 'only ',
        '意味着': 'means ',
        '你尚未': 'you have not ',
        '成功': 'succeeded ',
        '19770617':'抖音视频做得真好QWQ',
        '19760520':'你上你的班我上我的学QWQ别老是传播焦虑情绪',
    },
    
    // 英文到中文 - 扩展词汇
    'en-zh': {
        // 基础词汇
        '.': '。',
        '！': '！',
        '？': '？',
        '\n': '\n',
        '\r': '\r',
        '\r\n': '\r\n',
        'if': '如果',
        'I': '我',
        'me': '我',
        'you': '你',
        'she': '她',
        'he': '他',
        'her': '她',
        'him': '他',
        'couldn’t': '不能',
        'learn': '学会',
        'how': '如何',
        'to': '去',
        'face': '面对',
        'failure': '失败',
        'with': '以',
        'a': '一种',
        'peaceful': '平和',
        'mind': '心态',
        'you': '你',
        'would': '将',
        'never': '永远无法',
        'achieve': '实现',
        'your': '你的',
        'ambition': '抱负',
        'failure': '失败',
        'doesn’t': '并不',
        'mean': '意味着',
        'you': '你',
        'are': '是',
        'a': '一个',
        'failure': '失败者',
        'it': '它',
        'means': '意味着',
        'you': '你',
        'haven’t': '尚未',
        'succeeded': '成功',
        'yet': '',
        'Hello': '你好',
        'You':'你',
        'World': '世界',
        'Translation': '翻译',
        'Study': '学习',
        'Language': '语言',
        'Thank you': '谢谢',
        'Goodbye': '再见',
        'Friend': '朋友',
        'Family': '家庭',
        'Work': '工作',
        'School': '学校',
        'Teacher': '老师',
        'Student': '学生',
        'Book': '书',
        'Water': '水',
        'Fire': '火',
        'Mountain': '山',
        'Sea': '海',
        'Sky': '天',
        'Earth': '地',
        'Person': '人',
        'Heart': '心',
        'Love': '爱',
        'Beautiful': '美',
        'Good': '好',
        'Big': '大',
        'Small': '小',
        'High': '高',
        'Low': '低',
        'Fast': '快',
        'Slow': '慢',
        'New': '新',
        'Old': '旧',
        'Many': '多',
        'Few': '少',
        'Is': '是',
        'Not': '不',
        'Have': '有',
        'Without': '无',
        'Come': '来',
        'Go': '去',
        'Look': '看',
        'Listen': '听',
        'Say': '说',
        'Do': '做',
        'Eat': '吃',
        'Drink': '喝',
        'Sleep': '睡',
        'Walk': '走',
        'Run': '跑',
        'Sit': '坐',
        'Stand': '站',
        'Open': '开',
        'Close': '关',
        'Buy': '买',
        'Sell': '卖',
        'Give': '给',
        'Take': '拿',
        'Put': '放',
        'Find': '找',
        'Use': '用',
        'Think': '想',
        'Know': '知道',
        'Understand': '明白',
        'Help': '帮助',
        'Need': '需要',
        'Want': '想要',
        'Like': '喜欢',
        'Hate': '讨厌',
        'Afraid': '害怕',
        'Happy': '高兴',
        'Sad': '难过',
        'Angry': '生气',
        'Worry': '担心',
        'Hope': '希望',
        'Dream': '梦想',
        'Success': '成功',
        'Failure': '失败',
        'Effort': '努力',
        'Persist': '坚持',
        'Change': '改变',
        'Progress': '进步',
        'Development': '发展',
        'Innovation': '创新',
        'Tradition': '传统',
        'Culture': '文化',
        'History': '历史',
        'Future': '未来',
        'Now': '现在',
        'Past': '过去',
        'Time': '时间',
        'Space': '空间',
        'Place': '地方',
        'City': '城市',
        'Countryside': '乡村',
        'Country': '国家',
        'Government': '政府',
        'People': '人民',
        'Society': '社会',
        'Economy': '经济',
        'Politics': '政治',
        'Education': '教育',
        'Science': '科学',
        'Technology': '技术',
        'Art': '艺术',
        'Music': '音乐',
        'Movie': '电影',
        'Sports': '体育',
        'Health': '健康',
        'Medical': '医疗',
        'Food': '食物',
        'Clothes': '衣服',
        'House': '房子',
        'Car': '汽车',
        'Airplane': '飞机',
        'Train': '火车',
        'Ship': '船',
        'Money': '钱',
        'Price': '价格',
        'Value': '价值',
        'Quality': '质量',
        'Quantity': '数量',
        'Size': '大小',
        'Color': '颜色',
        'Shape': '形状',
        'Sound': '声音',
        'Taste': '味道',
        'Feeling': '感觉',
        'Temperature': '温度',
        'Weather': '天气',
        'Season': '季节',
        'Spring': '春天',
        'Summer': '夏天',
        'Autumn': '秋天',
        'Winter': '冬天',
        'Today': '今天',
        'Tomorrow': '明天',
        'Yesterday': '昨天',
        'Morning': '早上',
        'Noon': '中午',
        'Evening': '晚上',
        'Night': '夜晚',
        'Week': '星期',
        'Month': '月份',
        'Year': '年份',
        'Age': '年龄',
        'Birthday': '生日',
        'Holiday': '节日',
        'Spring Festival': '春节',
        'Mid-Autumn Festival': '中秋节',
        'National Day': '国庆节',
        'Christmas': '圣诞节',
        'New Year': '新年',
        'If ': '如果',
        'I ': '我',
        'me ': '我',
        'you ': '你',
        'she ': '她',
        'he ': '他',
        'her ': '她',
        'him ': '他',
        'couldn’t ': '不能',
        'learn ': '学会',
        'how ': '如何',
        'to ': '去',
        'face ': '面对',
        'failure ': '失败',
        'with ': '以',
        'a ': '一种',
        'peaceful ': '平和',
        'mind ': '心态',
        'would ': '将',
        'never ': '永远无法',
        'achieve ': '实现',
        'your ': '你的',
        'ambition ': '抱负',
        'failure ': '失败',
        'doesn’t ': '并不',
        'mean ': '意味着',
        'you ': '你',
        'are ': '是',
        'a ': '一个',
        'failure ': '失败者',
        'it ': '它',
        'means ': '意味着',
        'you ': '你',
        'haven’t ': '尚未',
        'succeeded ': '成功',
        'yet ': '',
        'Hello ': '你好',
        'You ': '你',
        'World ': '世界',
        'Translation ': '翻译',
        'Study ': '学习',
        'Language ': '语言',
        'Thank you ': '谢谢',
        'Goodbye ': '再见',
        'Friend ': '朋友',
        'Family ': '家庭',
        'Work ': '工作',
        'School ': '学校',
        'Teacher ': '老师',
        'Student ': '学生',
        'Book ': '书',
        'Water ': '水',
        'Fire ': '火',
        'Mountain ': '山',
        'Sea ': '海',
        'Sky ': '天',
        'Earth ': '地',
        'Person ': '人',
        'Heart ': '心',
        'Love ': '爱',
        'Beautiful ': '美',
        'Good ': '好',
        'Big ': '大',
        'Small ': '小',
        'High ': '高',
        'Low ': '低',
        'Fast ': '快',
        'Slow ': '慢',
        'New ': '新',
        'Old ': '旧',
        'Many ': '多',
        'Few ': '少',
        'Is ': '是',
        'Not ': '不',
        'Have ': '有',
        'Without ': '无',
        'Come ': '来',
        'Go ': '去',
        'Look ': '看',
        'Listen ': '听',
        'Say ': '说',
        'Do ': '做',
        'Eat ': '吃',
        'Drink ': '喝',
        'Sleep ': '睡',
        'Walk ': '走',
        'Run ': '跑',
        'Sit ': '坐',
        'Stand ': '站',
        'Open ': '开',
        'Close ': '关',
        'Buy ': '买',
        'Sell ': '卖',
        'Give ': '给',
        'Take ': '拿',
        'Put ': '放',
        'Find ': '找',
        'Use ': '用',
        'Think ': '想',
        'Know ': '知道',
        'Understand ': '明白',
        'Help ': '帮助',
        'Need ': '需要',
        'Want ': '想要',
        'Like ': '喜欢',
        'Hate ': '讨厌',
        'Afraid ': '害怕',
        'Happy ': '高兴',
        'Sad ': '难过',
        'Angry ': '生气',
        'Worry ': '担心',
        'Hope ': '希望',
        'Dream ': '梦想',
        'Success ': '成功',
        'Failure ': '失败',
        'Effort ': '努力',
        'Persist ': '坚持',
        'Change ': '改变',
        'Progress ': '进步',
        'Development ': '发展',
        'Innovation ': '创新',
        'Tradition ': '传统',
        'Culture ': '文化',
        'History ': '历史',
        'Future ': '未来',
        'Now ': '现在',
        'Past ': '过去',
        'Time ': '时间',
        'Space ': '空间',
        'Place ': '地方',
        'City ': '城市',
        'Countryside ': '乡村',
        'Country ': '国家',
        'Government ': '政府',
        'People ': '人民',
        'Society ': '社会',
        'Economy ': '经济',
        'Politics ': '政治',
        'Education ': '教育',
        'Science ': '科学',
        'Technology ': '技术',
        'Art ': '艺术',
        'Music ': '音乐',
        'Movie ': '电影',
        'Sports ': '体育',
        'Health ': '健康',
        'Medical ': '医疗',
        'Food ': '食物',
        'Clothes ': '衣服',
        'House ': '房子',
        'Car ': '汽车',
        'Airplane ': '飞机',
        'Train ': '火车',
        'Ship ': '船',
        'Money ': '钱',
        'Price ': '价格',
        'Value ': '价值',
        'Quality ': '质量',
        'Quantity ': '数量',
        'Size ': '大小',
        'Color ': '颜色',
        'Shape ': '形状',
        'Sound ': '声音',
        'Taste ': '味道',
        'Feeling ': '感觉',
        'Temperature ': '温度',
        'Weather ': '天气',
        'Season ': '季节',
        'Spring ': '春天',
        'Summer ': '夏天',
        'Autumn ': '秋天',
        'Winter ': '冬天',
        'Today ': '今天',
        'Tomorrow ': '明天',
        'Yesterday ': '昨天',
        'Morning ': '早上',
        'Noon ': '中午',
        'Evening ': '晚上',
        'Night ': '夜晚',
        'Week ': '星期',
        'Month ': '月份',
        'Year ': '年份',
        'Age ': '年龄',
        'Birthday ': '生日',
        'Holiday ': '节日',
        'Spring Festival ': '春节',
        'Mid-Autumn Festival ': '中秋节',
        'National Day ': '国庆节',
        'Christmas ': '圣诞节',
        'New Year ': '新年'
    },
    
    // 中文到文言文 - 基于古汉语常用字字典
    'zh-classical': {
        // 基础词汇
        '。': '。',
        '！': '！',
        '？': '？',
        '\n': '\n',
        '\r': '\r',
        '\r\n': '\r\n',
        '你好': '汝好',
        '世界': '天下',
        '翻译': '译',
        '学习': '学',
        '语言': '言',
        '谢谢': '谢',
        '再见': '别',
        '朋友': '友',
        '家庭': '家',
        '工作': '作',
        '学校': '庠序',
        '老师': '师',
        '学生': '生',
        '书': '书',
        '水': '水',
        '火': '火',
        '山': '山',
        '海': '海',
        '天': '天',
        '地': '地',
        '人': '人',
        '心': '心',
        '爱': '爱',
        '美': '美',
        '好': '善',
        '大': '大',
        '小': '小',
        '高': '高',
        '低': '低',
        '快': '疾',
        '慢': '缓',
        '新': '新',
        '旧': '旧',
        '多': '众',
        '少': '寡',
        '是': '是',
        '不': '不',
        '有': '有',
        '无': '无',
        '来': '来',
        '去': '去',
        '看': '视',
        '听': '听',
        '说': '言',
        '做': '为',
        '吃': '食',
        '喝': '饮',
        '睡': '寝',
        '走': '行',
        '跑': '奔',
        '坐': '坐',
        '站': '立',
        '开': '开',
        '关': '闭',
        '买': '买',
        '卖': '卖',
        '给': '予',
        '拿': '取',
        '放': '置',
        '找': '寻',
        '用': '用',
        '想': '思',
        '知道': '知',
        '明白': '明',
        '帮助': '助',
        '需要': '需',
        '想要': '欲',
        '喜欢': '好',
        '讨厌': '恶',
        '害怕': '惧',
        '高兴': '悦',
        '难过': '悲',
        '生气': '怒',
        '担心': '忧',
        '希望': '望',
        '梦想': '梦',
        '成功': '成',
        '失败': '败',
        '努力': '力',
        '坚持': '持',
        '改变': '变',
        '进步': '进',
        '发展': '展',
        '创新': '新',
        '传统': '传',
        '文化': '文',
        '历史': '史',
        '未来': '来',
        '现在': '今',
        '过去': '昔',
        '时间': '时',
        '空间': '空',
        '地方': '处',
        '城市': '城',
        '乡村': '乡',
        '国家': '国',
        '政府': '府',
        '人民': '民',
        '社会': '社',
        '经济': '经',
        '政治': '政',
        '教育': '教',
        '科学': '科',
        '技术': '术',
        '艺术': '艺',
        '音乐': '乐',
        '电影': '影',
        '体育': '体',
        '健康': '康',
        '医疗': '医',
        '食物': '食',
        '衣服': '衣',
        '房子': '屋',
        '汽车': '车',
        '飞机': '机',
        '火车': '车',
        '船': '舟',
        '钱': '钱',
        '价格': '价',
        '价值': '值',
        '质量': '质',
        '数量': '数',
        '大小': '大',
        '颜色': '色',
        '形状': '形',
        '声音': '声',
        '味道': '味',
        '感觉': '感',
        '温度': '温',
        '天气': '气',
        '季节': '季',
        '春天': '春',
        '夏天': '夏',
        '秋天': '秋',
        '冬天': '冬',
        '今天': '今',
        '明天': '明',
        '昨天': '昨',
        '早上': '晨',
        '中午': '午',
        '晚上': '夕',
        '夜晚': '夜',
        '星期': '周',
        '月份': '月',
        '年份': '年',
        '年龄': '龄',
        '生日': '诞',
        '节日': '节',
        '春节': '春',
        '中秋节': '秋',
        '国庆节': '国',
        '圣诞节': '圣',
        '新年': '新'
    },
    
    // 文言文到中文
    'classical-zh': {
        
        '。': '。',
        '！': '！',
        '？': '？',
        '\n': '\n',
        '\r': '\r',
        '\r\n': '\r\n',
        '也': '',
        '伯乐': '伯乐',
        '称': '著称',
        '故': '因此',
        '且': '并且',
        '安': '怎么',
        '其': '它',
        '奴隶人': '仆役',
        '槽枥': '马厩',
        '之间': '之中',
        '以': '因',
        '骈':'并列',
        '故': '因此',
        '汝好': '你好',
        '天下': '世界',
        '译': '翻译',
        '学': '学习',
        '言': '语言',
        '谢': '谢谢',
        '别': '再见',
        '友': '朋友',
        '家': '家庭',
        '作': '工作',
        '庠序': '学校',
        '师': '老师',
        '生': '学生',
        '善': '好',
        '疾': '快',
        '缓': '慢',
        '新': '新',
        '旧': '旧',
        '众': '多',
        '寡': '少',
        '视': '看',
        '听': '听',
        '言': '说',
        '为': '做',
        '食': '吃',
        '饮': '喝',
        '寝': '睡',
        '行': '走',
        '奔': '跑',
        '坐': '坐',
        '立': '站',
        '开': '开',
        '闭': '关',
        '买': '买',
        '卖': '卖',
        '予': '给',
        '取': '拿',
        '置': '放',
        '寻': '找',
        '用': '用',
        '思': '想',
        '知': '知道',
        '明': '明白',
        '助': '帮助',
        '需': '需要',
        '欲': '想要',
        '好': '喜欢',
        '恶': '讨厌',
        '惧': '害怕',
        '悦': '高兴',
        '悲': '难过',
        '怒': '生气',
        '忧': '担心',
        '望': '希望',
        '梦': '梦想',
        '成': '成功',
        '败': '失败',
        '力': '努力',
        '持': '坚持',
        '变': '改变',
        '进': '进步',
        '展': '发展',
        '新': '创新',
        '传': '传统',
        '文': '文化',
        '史': '历史',
        '来': '未来',
        '今': '现在',
        '昔': '过去',
        '时': '时间',
        '空': '空间',
        '处': '地方',
        '城': '城市',
        '乡': '乡村',
        '国': '国家',
        '府': '政府',
        '民': '人民',
        '社': '社会',
        '经': '经济',
        '政': '政治',
        '教': '教育',
        '科': '科学',
        '术': '技术',
        '艺': '艺术',
        '影': '电影',
        '体': '体育',
        '康': '健康',
        '医': '医疗',
        '食': '食物',
        '衣': '衣服',
        '屋': '房子',
        '车': '汽车',
        '机': '飞机',
        '舟': '船',
        '钱': '钱',
        '价': '价格',
        '值': '价值',
        '质': '质量',
        '数': '数量',
        '色': '颜色',
        '形': '形状',
        '声': '声音',
        '味': '味道',
        '感': '感觉',
        '温': '温度',
        '气': '天气',
        '季': '季节',
        '春': '春天',
        '夏': '夏天',
        '秋': '秋天',
        '冬': '冬天',
        '今': '今天',
        '明': '明天',
        '昨': '昨天',
        '晨': '早上',
        '午': '中午',
        '夕': '晚上',
        '夜': '夜晚',
        '周': '星期',
        '月': '月份',
        '年': '年份',
        '龄': '年龄',
        '诞': '生日',
        '节': '节日',
        '圣': '圣人',
        '世': '世间',
        '常': '经常',
        '虽': '虽然',
        '祗': '只',
        '辱': '受辱',
        '尽': '尽',
        '知': '知道',
        '能': '能够',
        '饱': '饱',
        '力': '力量',
        '才': '才能',
        '见': '显现',
        '求': '要求',
        '策': '鞭策',
        '鸣': '叫',
        '通': '通晓',
        '执': '拿着',
        '临': '面对',
        '曰': '说',
        '无': '没有',
        '呜呼': '唉',
        '真': '真的',
        '邪': '吗'
    },
    
    // 英文到文言文
    'en-classical': {
        '。': '。',
        '！': '！',
        '？': '？',
        '\n': '\n',
        '\r': '\r',
        '\r\n': '\r\n',
        'Hello': '汝好',
        'World': '天下',
        'Translation': '译',
        'Study': '学',
        'Language': '言',
        'Thank you': '谢',
        'Goodbye': '别',
        'Friend': '友',
        'Family': '家',
        'Work': '作',
        'School': '庠序',
        'Teacher': '师',
        'Student': '生',
        'Book': '书',
        'Water': '水',
        'Fire': '火',
        'Mountain': '山',
        'Sea': '海',
        'Sky': '天',
        'Earth': '地',
        'Person': '人',
        'Heart': '心',
        'Love': '爱',
        'Beautiful': '美',
        'Good': '善',
        'Big': '大',
        'Small': '小',
        'High': '高',
        'Low': '低',
        'Fast': '疾',
        'Slow': '缓',
        'New': '新',
        'Old': '旧',
        'Many': '众',
        'Few': '寡',
        'Is': '是',
        'Not': '不',
        'Have': '有',
        'Without': '无',
        'Come': '来',
        'Go': '去',
        'Look': '视',
        'Listen': '听',
        'Say': '言',
        'Do': '为',
        'Eat': '食',
        'Drink': '饮',
        'Sleep': '寝',
        'Walk': '行',
        'Run': '奔',
        'Sit': '坐',
        'Stand': '立',
        'Open': '开',
        'Close': '闭',
        'Buy': '买',
        'Sell': '卖',
        'Give': '予',
        'Take': '取',
        'Put': '置',
        'Find': '寻',
        'Use': '用',
        'Think': '思',
        'Know': '知',
        'Understand': '明',
        'Help': '助',
        'Need': '需',
        'Want': '欲',
        'Like': '好',
        'Hate': '恶',
        'Afraid': '惧',
        'Happy': '悦',
        'Sad': '悲',
        'Angry': '怒',
        'Worry': '忧',
        'Hope': '望',
        'Dream': '梦',
        'Success': '成',
        'Failure': '败',
        'Effort': '力',
        'Persist': '持',
        'Change': '变',
        'Progress': '进',
        'Development': '展',
        'Innovation': '新',
        'Tradition': '传',
        'Culture': '文',
        'History': '史',
        'Future': '来',
        'Now': '今',
        'Past': '昔',
        'Time': '时',
        'Space': '空',
        'Place': '处',
        'City': '城',
        'Countryside': '乡',
        'Country': '国',
        'Government': '府',
        'People': '民',
        'Society': '社',
        'Economy': '经',
        'Politics': '政',
        'Education': '教',
        'Science': '科',
        'Technology': '术',
        'Art': '艺',
        'Music': '乐',
        'Movie': '影',
        'Sports': '体',
        'Health': '康',
        'Medical': '医',
        'Food': '食',
        'Clothes': '衣',
        'House': '屋',
        'Car': '车',
        'Airplane': '机',
        'Train': '车',
        'Ship': '舟',
        'Money': '钱',
        'Price': '价',
        'Value': '值',
        'Quality': '质',
        'Quantity': '数',
        'Size': '大',
        'Color': '色',
        'Shape': '形',
        'Sound': '声',
        'Taste': '味',
        'Feeling': '感',
        'Temperature': '温',
        'Weather': '气',
        'Season': '季',
        'Spring': '春',
        'Summer': '夏',
        'Autumn': '秋',
        'Winter': '冬',
        'Today': '今',
        'Tomorrow': '明',
        'Yesterday': '昨',
        'Morning': '晨',
        'Noon': '午',
        'Evening': '夕',
        'Night': '夜',
        'Week': '周',
        'Month': '月',
        'Year': '年',
        'Age': '龄',
        'Birthday': '诞',
        'Holiday': '节',
        'Spring Festival': '春',
        'Mid-Autumn Festival': '秋',
        'National Day': '国',
        'Christmas': '圣',
        'New Year': '新',
    },
    
    // 文言文到英文
    'classical-en': {
        '汝好': 'Hello',
        '天下': 'World',
        '译': 'Translation',
        '学': 'Study',
        '言': 'Language',
        '谢': 'Thank you',
        '别': 'Goodbye',
        '友': 'Friend',
        '家': 'Family',
        '作': 'Work',
        '庠序': 'School',
        '师': 'Teacher',
        '生': 'Student',
        '书': 'Book',
        '水': 'Water',
        '火': 'Fire',
        '山': 'Mountain',
        '海': 'Sea',
        '天': 'Sky',
        '地': 'Earth',
        '人': 'Person',
        '心': 'Heart',
        '爱': 'Love',
        '美': 'Beautiful',
        '善': 'Good',
        '大': 'Big',
        '小': 'Small',
        '高': 'High',
        '低': 'Low',
        '疾': 'Fast',
        '缓': 'Slow',
        '新': 'New',
        '旧': 'Old',
        '众': 'Many',
        '寡': 'Few',
        '是': 'Is',
        '不': 'Not',
        '有': 'Have',
        '无': 'Without',
        '来': 'Come',
        '去': 'Go',
        '视': 'Look',
        '听': 'Listen',
        '言': 'Say',
        '为': 'Do',
        '食': 'Eat',
        '饮': 'Drink',
        '寝': 'Sleep',
        '行': 'Walk',
        '奔': 'Run',
        '坐': 'Sit',
        '立': 'Stand',
        '开': 'Open',
        '闭': 'Close',
        '买': 'Buy',
        '卖': 'Sell',
        '予': 'Give',
        '取': 'Take',
        '置': 'Put',
        '寻': 'Find',
        '用': 'Use',
        '思': 'Think',
        '知': 'Know',
        '明': 'Understand',
        '助': 'Help',
        '需': 'Need',
        '欲': 'Want',
        '好': 'Like',
        '恶': 'Hate',
        '惧': 'Afraid',
        '悦': 'Happy',
        '悲': 'Sad',
        '怒': 'Angry',
        '忧': 'Worry',
        '望': 'Hope',
        '梦': 'Dream',
        '成': 'Success',
        '败': 'Failure',
        '力': 'Effort',
        '持': 'Persist',
        '变': 'Change',
        '进': 'Progress',
        '展': 'Development',
        '新': 'Innovation',
        '传': 'Tradition',
        '文': 'Culture',
        '史': 'History',
        '来': 'Future',
        '今': 'Now',
        '昔': 'Past',
        '时': 'Time',
        '空': 'Space',
        '处': 'Place',
        '城': 'City',
        '乡': 'Countryside',
        '国': 'Country',
        '府': 'Government',
        '民': 'People',
        '社': 'Society',
        '经': 'Economy',
        '政': 'Politics',
        '教': 'Education',
        '科': 'Science',
        '术': 'Technology',
        '艺': 'Art',
        '乐': 'Music',
        '影': 'Movie',
        '体': 'Sports',
        '康': 'Health',
        '医': 'Medical',
        '食': 'Food',
        '衣': 'Clothes',
        '屋': 'House',
        '车': 'Car',
        '机': 'Airplane',
        '舟': 'Ship',
        '钱': 'Money',
        '价': 'Price',
        '值': 'Value',
        '质': 'Quality',
        '数': 'Quantity',
        '色': 'Color',
        '形': 'Shape',
        '声': 'Sound',
        '味': 'Taste',
        '感': 'Feeling',
        '温': 'Temperature',
        '气': 'Weather',
        '季': 'Season',
        '春': 'Spring',
        '夏': 'Summer',
        '秋': 'Autumn',
        '冬': 'Winter',
        '今': 'Today',
        '明': 'Tomorrow',
        '昨': 'Yesterday',
        '晨': 'Morning',
        '午': 'Noon',
        '夕': 'Evening',
        '夜': 'Night',
        '周': 'Week',
        '月': 'Month',
        '年': 'Year',
        '龄': 'Age',
        '诞': 'Birthday',
        '节': 'Holiday',
        '圣': 'Christmas'
    }
};

// 扩展的单词搜索数据库 - 基于英汉大辞典和古汉语常用字字典
const wordDatabase = {
    // 英文单词 - 基础词汇
    'hello': {
        meaning: '你好，问候语',
        pronunciation: '/həˈloʊ/',
        pos: 'interjection',
        examples: ['Hello, how are you?', 'Hello world!'],
        synonyms: ['hi', 'hey', 'greetings']
    },
    'good': {
        meaning: '好的，优秀的',
        pronunciation: '/ɡʊd/',
        pos: 'adjective',
        examples: ['This is a good book.', 'Good morning!'],
        synonyms: ['excellent', 'fine', 'great', 'nice']
    },
    'bad': {
        meaning: '坏的，不好的',
        pronunciation: '/bæd/',
        pos: 'adjective',
        examples: ['That\'s a bad idea.', 'Bad weather today.'],
        synonyms: ['terrible', 'awful', 'poor', 'horrible']
    },
    'very': {
        meaning: '非常，很',
        pronunciation: '/ˈveri/',
        pos: 'adverb',
        examples: ['I\'m very happy.', 'It\'s very cold.'],
        synonyms: ['extremely', 'quite', 'really', 'highly']
    },
    'much': {
        meaning: '很多，大量',
        pronunciation: '/mʌtʃ/',
        pos: 'adverb/determiner',
        examples: ['Thank you very much.', 'How much does it cost?'],
        synonyms: ['a lot', 'plenty', 'considerable', 'extensive']
    },
    'little': {
        meaning: '小的，少的',
        pronunciation: '/ˈlɪtəl/',
        pos: 'adjective/adverb',
        examples: ['A little bird.', 'I speak little English.'],
        synonyms: ['small', 'tiny', 'minor', 'slight']
    },
    'big': {
        meaning: '大的，重要的',
        pronunciation: '/bɪɡ/',
        pos: 'adjective',
        examples: ['A big house.', 'Big news!'],
        synonyms: ['large', 'huge', 'enormous', 'massive']
    },
    'small': {
        meaning: '小的，微小的',
        pronunciation: '/smɔːl/',
        pos: 'adjective',
        examples: ['A small room.', 'Small changes.'],
        synonyms: ['little', 'tiny', 'miniature', 'compact']
    },
    'old': {
        meaning: '老的，旧的',
        pronunciation: '/oʊld/',
        pos: 'adjective',
        examples: ['An old man.', 'Old traditions.'],
        synonyms: ['aged', 'ancient', 'elderly', 'vintage']
    },
    'young': {
        meaning: '年轻的',
        pronunciation: '/jʌŋ/',
        pos: 'adjective',
        examples: ['A young woman.', 'Young people.'],
        synonyms: ['youthful', 'juvenile', 'adolescent', 'fresh']
    },
    'new': {
        meaning: '新的，新鲜的',
        pronunciation: '/nuː/',
        pos: 'adjective',
        examples: ['A new car.', 'New technology.'],
        synonyms: ['fresh', 'modern', 'recent', 'novel']
    },
    'first': {
        meaning: '第一的，首先',
        pronunciation: '/fɜːrst/',
        pos: 'adjective/adverb',
        examples: ['First place.', 'First, let me introduce myself.'],
        synonyms: ['initial', 'primary', 'foremost', 'beginning']
    },
    'last': {
        meaning: '最后的，最近的',
        pronunciation: '/læst/',
        pos: 'adjective/adverb',
        examples: ['Last week.', 'The last person.'],
        synonyms: ['final', 'ultimate', 'previous', 'recent']
    },
    'next': {
        meaning: '下一个的，接下来的',
        pronunciation: '/nekst/',
        pos: 'adjective/adverb',
        examples: ['Next time.', 'What\'s next?'],
        synonyms: ['following', 'upcoming', 'subsequent', 'coming']
    },
    'here': {
        meaning: '这里，在这里',
        pronunciation: '/hɪr/',
        pos: 'adverb',
        examples: ['Come here.', 'Here is the book.'],
        synonyms: ['this place', 'present', 'available', 'nearby']
    },
    'there': {
        meaning: '那里，在那里',
        pronunciation: '/ðer/',
        pos: 'adverb',
        examples: ['Go there.', 'There is a cat.'],
        synonyms: ['that place', 'yonder', 'over there', 'away']
    },
    'where': {
        meaning: '哪里，在哪里',
        pronunciation: '/wer/',
        pos: 'adverb',
        examples: ['Where are you?', 'Where is the station?'],
        synonyms: ['at what place', 'in what location', 'whither']
    },
    'when': {
        meaning: '什么时候，当...时',
        pronunciation: '/wen/',
        pos: 'adverb/conjunction',
        examples: ['When did you arrive?', 'When I was young.'],
        synonyms: ['at what time', 'during which', 'while', 'as']
    },
    'why': {
        meaning: '为什么',
        pronunciation: '/waɪ/',
        pos: 'adverb',
        examples: ['Why are you sad?', 'That\'s why I came.'],
        synonyms: ['for what reason', 'how come', 'what for']
    },
    'how': {
        meaning: '如何，怎样',
        pronunciation: '/haʊ/',
        pos: 'adverb',
        examples: ['How are you?', 'How to cook?'],
        synonyms: ['in what way', 'by what means', 'to what extent']
    },
    'world': {
        meaning: '世界，地球',
        pronunciation: '/wɜːrld/',
        pos: 'noun',
        examples: ['Hello world!', 'The world is beautiful.'],
        synonyms: ['earth', 'globe', 'planet']
    },
    'love': {
        meaning: '爱，爱情',
        pronunciation: '/lʌv/',
        pos: 'noun/verb',
        examples: ['I love you.', 'Love is beautiful.'],
        synonyms: ['affection', 'adore', 'cherish']
    },
    'beautiful': {
        meaning: '美丽的，漂亮的',
        pronunciation: '/ˈbjuːtɪfəl/',
        pos: 'adjective',
        examples: ['She is beautiful.', 'Beautiful flowers.'],
        synonyms: ['pretty', 'lovely', 'gorgeous']
    },
    'friend': {
        meaning: '朋友',
        pronunciation: '/frend/',
        pos: 'noun',
        examples: ['He is my friend.', 'Good friends help each other.'],
        synonyms: ['companion', 'buddy', 'pal']
    },
    'family': {
        meaning: '家庭，家人',
        pronunciation: '/ˈfæməli/',
        pos: 'noun',
        examples: ['I love my family.', 'Family is important.'],
        synonyms: ['relatives', 'kin', 'household']
    },
    'school': {
        meaning: '学校',
        pronunciation: '/skuːl/',
        pos: 'noun',
        examples: ['I go to school.', 'School is fun.'],
        synonyms: ['academy', 'institution', 'college']
    },
    'teacher': {
        meaning: '老师，教师',
        pronunciation: '/ˈtiːtʃər/',
        pos: 'noun',
        examples: ['My teacher is kind.', 'Teachers help students.'],
        synonyms: ['instructor', 'educator', 'professor']
    },
    'student': {
        meaning: '学生',
        pronunciation: '/ˈstuːdənt/',
        pos: 'noun',
        examples: ['I am a student.', 'Students study hard.'],
        synonyms: ['pupil', 'learner', 'scholar']
    },
    'book': {
        meaning: '书，书籍',
        pronunciation: '/bʊk/',
        pos: 'noun',
        examples: ['I read a book.', 'Books are knowledge.'],
        synonyms: ['volume', 'novel', 'text']
    },
    'water': {
        meaning: '水',
        pronunciation: '/ˈwɔːtər/',
        pos: 'noun',
        examples: ['I drink water.', 'Water is essential.'],
        synonyms: ['liquid', 'H2O', 'aqua']
    },
    'fire': {
        meaning: '火',
        pronunciation: '/faɪər/',
        pos: 'noun',
        examples: ['Fire is hot.', 'Don\'t play with fire.'],
        synonyms: ['flame', 'blaze', 'combustion']
    },
    'mountain': {
        meaning: '山，山脉',
        pronunciation: '/ˈmaʊntən/',
        pos: 'noun',
        examples: ['The mountain is high.', 'I climb mountains.'],
        synonyms: ['peak', 'hill', 'summit']
    },
    'sea': {
        meaning: '海，海洋',
        pronunciation: '/siː/',
        pos: 'noun',
        examples: ['The sea is blue.', 'I swim in the sea.'],
        synonyms: ['ocean', 'water', 'marine']
    },
    'sky': {
        meaning: '天空',
        pronunciation: '/skaɪ/',
        pos: 'noun',
        examples: ['The sky is blue.', 'Birds fly in the sky.'],
        synonyms: ['heaven', 'atmosphere', 'firmament']
    },
    'earth': {
        meaning: '地球，土地',
        pronunciation: '/ɜːrθ/',
        pos: 'noun',
        examples: ['Earth is our home.', 'The earth is round.'],
        synonyms: ['world', 'ground', 'planet']
    },
    'person': {
        meaning: '人，个人',
        pronunciation: '/ˈpɜːrsən/',
        pos: 'noun',
        examples: ['He is a good person.', 'Every person is unique.'],
        synonyms: ['individual', 'human', 'being']
    },
    'heart': {
        meaning: '心，心脏',
        pronunciation: '/hɑːrt/',
        pos: 'noun',
        examples: ['My heart beats fast.', 'He has a kind heart.'],
        synonyms: ['organ', 'center', 'core']
    },
    'time': {
        meaning: '时间',
        pronunciation: '/taɪm/',
        pos: 'noun',
        examples: ['Time flies.', 'What time is it?'],
        synonyms: ['moment', 'period', 'duration']
    },
    'money': {
        meaning: '钱，金钱',
        pronunciation: '/ˈmʌni/',
        pos: 'noun',
        examples: ['I need money.', 'Money can\'t buy happiness.'],
        synonyms: ['cash', 'currency', 'funds']
    },
    
    // 专业词汇 - 科技类
    'computer': {
        meaning: '计算机，电脑',
        pronunciation: '/kəmˈpjuːtər/',
        pos: 'noun',
        examples: ['I use a computer for work.', 'Computer science is interesting.'],
        synonyms: ['PC', 'machine', 'device', 'system']
    },
    'technology': {
        meaning: '技术，科技',
        pronunciation: '/tekˈnɑːlədʒi/',
        pos: 'noun',
        examples: ['Modern technology is amazing.', 'Technology changes our lives.'],
        synonyms: ['tech', 'innovation', 'engineering', 'advancement']
    },
    'internet': {
        meaning: '互联网，网络',
        pronunciation: '/ˈɪntərnet/',
        pos: 'noun',
        examples: ['I surf the internet.', 'Internet connection is fast.'],
        synonyms: ['web', 'net', 'online', 'cyberspace']
    },
    'software': {
        meaning: '软件',
        pronunciation: '/ˈsɔːftwer/',
        pos: 'noun',
        examples: ['This software is useful.', 'Software development is complex.'],
        synonyms: ['program', 'application', 'app', 'system']
    },
    'hardware': {
        meaning: '硬件',
        pronunciation: '/ˈhɑːrdwer/',
        pos: 'noun',
        examples: ['Computer hardware is expensive.', 'Hardware problems are difficult.'],
        synonyms: ['equipment', 'components', 'machinery', 'devices']
    },
    'artificial': {
        meaning: '人工的，人造的',
        pronunciation: '/ˌɑːrtɪˈfɪʃəl/',
        pos: 'adjective',
        examples: ['Artificial intelligence is developing.', 'Artificial flowers look real.'],
        synonyms: ['synthetic', 'man-made', 'fake', 'simulated']
    },
    'intelligence': {
        meaning: '智能，智力',
        pronunciation: '/ɪnˈtelɪdʒəns/',
        pos: 'noun',
        examples: ['Artificial intelligence is powerful.', 'Human intelligence is unique.'],
        synonyms: ['wisdom', 'smartness', 'brainpower', 'reasoning']
    },
    'algorithm': {
        meaning: '算法',
        pronunciation: '/ˈælɡərɪðəm/',
        pos: 'noun',
        examples: ['This algorithm is efficient.', 'Algorithm design is important.'],
        synonyms: ['procedure', 'method', 'process', 'formula']
    },
    'database': {
        meaning: '数据库',
        pronunciation: '/ˈdeɪtəbeɪs/',
        pos: 'noun',
        examples: ['The database is large.', 'Database management is crucial.'],
        synonyms: ['repository', 'archive', 'storage', 'collection']
    },
    'network': {
        meaning: '网络，关系网',
        pronunciation: '/ˈnetwɜːrk/',
        pos: 'noun',
        examples: ['Computer network is secure.', 'Social network is popular.'],
        synonyms: ['system', 'web', 'grid', 'connection']
    },
    
    // 专业词汇 - 医学类
    'health': {
        meaning: '健康',
        pronunciation: '/helθ/',
        pos: 'noun',
        examples: ['Health is important.', 'Good health brings happiness.'],
        synonyms: ['wellness', 'fitness', 'condition', 'state']
    },
    'medicine': {
        meaning: '医学，药物',
        pronunciation: '/ˈmedəsən/',
        pos: 'noun',
        examples: ['Modern medicine is advanced.', 'Take your medicine.'],
        synonyms: ['drug', 'treatment', 'therapy', 'remedy']
    },
    'doctor': {
        meaning: '医生，博士',
        pronunciation: '/ˈdɑːktər/',
        pos: 'noun',
        examples: ['The doctor is kind.', 'Doctor Smith is famous.'],
        synonyms: ['physician', 'medic', 'practitioner', 'specialist']
    },
    'hospital': {
        meaning: '医院',
        pronunciation: '/ˈhɑːspɪtəl/',
        pos: 'noun',
        examples: ['The hospital is nearby.', 'Hospital staff are busy.'],
        synonyms: ['clinic', 'medical center', 'infirmary', 'ward']
    },
    'patient': {
        meaning: '病人，耐心的',
        pronunciation: '/ˈpeɪʃənt/',
        pos: 'noun/adjective',
        examples: ['The patient is recovering.', 'Be patient with children.'],
        synonyms: ['sick person', 'enduring', 'tolerant', 'persistent']
    },
    'surgery': {
        meaning: '手术，外科',
        pronunciation: '/ˈsɜːrdʒəri/',
        pos: 'noun',
        examples: ['The surgery was successful.', 'Surgery requires skill.'],
        synonyms: ['operation', 'procedure', 'intervention', 'treatment']
    },
    'disease': {
        meaning: '疾病',
        pronunciation: '/dɪˈziːz/',
        pos: 'noun',
        examples: ['This disease is serious.', 'Prevent disease with exercise.'],
        synonyms: ['illness', 'sickness', 'disorder', 'condition']
    },
    'treatment': {
        meaning: '治疗，处理',
        pronunciation: '/ˈtriːtmənt/',
        pos: 'noun',
        examples: ['The treatment is effective.', 'Fair treatment for everyone.'],
        synonyms: ['therapy', 'care', 'management', 'handling']
    },
    'symptom': {
        meaning: '症状',
        pronunciation: '/ˈsɪmptəm/',
        pos: 'noun',
        examples: ['The symptom is clear.', 'Early symptoms are important.'],
        synonyms: ['sign', 'indication', 'manifestation', 'evidence']
    },
    'diagnosis': {
        meaning: '诊断',
        pronunciation: '/ˌdaɪəɡˈnoʊsɪs/',
        pos: 'noun',
        examples: ['The diagnosis is accurate.', 'Early diagnosis saves lives.'],
        synonyms: ['assessment', 'evaluation', 'identification', 'analysis']
    },
    
    // 专业词汇 - 法律类
    'law': {
        meaning: '法律，规律',
        pronunciation: '/lɔː/',
        pos: 'noun',
        examples: ['The law is clear.', 'Natural law governs physics.'],
        synonyms: ['regulation', 'rule', 'statute', 'principle']
    },
    'legal': {
        meaning: '合法的，法律的',
        pronunciation: '/ˈliːɡəl/',
        pos: 'adjective',
        examples: ['This is legal.', 'Legal advice is important.'],
        synonyms: ['lawful', 'legitimate', 'valid', 'authorized']
    },
    'court': {
        meaning: '法院，法庭',
        pronunciation: '/kɔːrt/',
        pos: 'noun',
        examples: ['The court is fair.', 'Court proceedings are formal.'],
        synonyms: ['tribunal', 'judiciary', 'bench', 'forum']
    },
    'judge': {
        meaning: '法官，判断',
        pronunciation: '/dʒʌdʒ/',
        pos: 'noun/verb',
        examples: ['The judge is wise.', 'Don\'t judge others.'],
        synonyms: ['magistrate', 'evaluate', 'assess', 'determine']
    },
    'justice': {
        meaning: '正义，司法',
        pronunciation: '/ˈdʒʌstɪs/',
        pos: 'noun',
        examples: ['Justice must prevail.', 'Social justice is important.'],
        synonyms: ['fairness', 'equity', 'righteousness', 'impartiality']
    },
    'right': {
        meaning: '权利，正确的',
        pronunciation: '/raɪt/',
        pos: 'noun/adjective',
        examples: ['You have the right.', 'This answer is right.'],
        synonyms: ['entitlement', 'correct', 'proper', 'accurate']
    },
    'wrong': {
        meaning: '错误的，坏事',
        pronunciation: '/rɔːŋ/',
        pos: 'adjective/noun',
        examples: ['This is wrong.', 'Don\'t do wrong.'],
        synonyms: ['incorrect', 'mistaken', 'improper', 'unjust']
    },
    'crime': {
        meaning: '犯罪，罪行',
        pronunciation: '/kraɪm/',
        pos: 'noun',
        examples: ['Crime is increasing.', 'This crime is serious.'],
        synonyms: ['offense', 'violation', 'misdeed', 'felony']
    },
    'punishment': {
        meaning: '惩罚，处罚',
        pronunciation: '/ˈpʌnɪʃmənt/',
        pos: 'noun',
        examples: ['The punishment is fair.', 'Severe punishment deters crime.'],
        synonyms: ['penalty', 'discipline', 'consequence', 'retribution']
    },
    'evidence': {
        meaning: '证据，证明',
        pronunciation: '/ˈevɪdəns/',
        pos: 'noun',
        examples: ['The evidence is clear.', 'Present your evidence.'],
        synonyms: ['proof', 'testimony', 'indication', 'confirmation']
    },
    
    // 中文词汇 - 基础词汇
    '你好': {
        meaning: 'Hello, a greeting in Chinese',
        pronunciation: 'nǐ hǎo',
        pos: '问候语',
        examples: ['你好，很高兴见到你', '你好，今天天气怎么样？'],
        synonyms: ['您好', '嗨', '哈喽']
    },
    '我': {
        meaning: 'I, me',
        pronunciation: 'wǒ',
        pos: '代词',
        examples: ['我是学生', '我喜欢读书'],
        synonyms: ['本人', '自己', '吾']
    },
    '你': {
        meaning: 'you',
        pronunciation: 'nǐ',
        pos: '代词',
        examples: ['你好吗？', '你叫什么名字？'],
        synonyms: ['您', '汝', '君']
    },
    '他': {
        meaning: 'he, him',
        pronunciation: 'tā',
        pos: '代词',
        examples: ['他是老师', '他很聪明'],
        synonyms: ['彼', '其', '伊']
    },
    '她': {
        meaning: 'she, her',
        pronunciation: 'tā',
        pos: '代词',
        examples: ['她很漂亮', '她是医生'],
        synonyms: ['彼女', '伊', '其']
    },
    '我们': {
        meaning: 'we, us',
        pronunciation: 'wǒ men',
        pos: '代词',
        examples: ['我们是朋友', '我们一起学习'],
        synonyms: ['咱们', '吾等', '我等']
    },
    '你们': {
        meaning: 'you (plural)',
        pronunciation: 'nǐ men',
        pos: '代词',
        examples: ['你们好', '你们去哪里？'],
        synonyms: ['诸位', '汝等', '君等']
    },
    '他们': {
        meaning: 'they, them',
        pronunciation: 'tā men',
        pos: '代词',
        examples: ['他们很忙', '他们来自北京'],
        synonyms: ['彼等', '其等', '伊等']
    },
    '这': {
        meaning: 'this',
        pronunciation: 'zhè',
        pos: '代词',
        examples: ['这是什么？', '这本书很好'],
        synonyms: ['此', '斯', '兹']
    },
    '那': {
        meaning: 'that',
        pronunciation: 'nà',
        pos: '代词',
        examples: ['那是什么？', '那个人是谁？'],
        synonyms: ['彼', '其', '厥']
    },
    '什么': {
        meaning: 'what',
        pronunciation: 'shén me',
        pos: '疑问词',
        examples: ['你在做什么？', '这是什么？'],
        synonyms: ['何', '啥', '啥子']
    },
    '怎么': {
        meaning: 'how',
        pronunciation: 'zěn me',
        pos: '疑问词',
        examples: ['你怎么了？', '怎么去那里？'],
        synonyms: ['如何', '怎样', '咋']
    },
    '为什么': {
        meaning: 'why',
        pronunciation: 'wèi shén me',
        pos: '疑问词',
        examples: ['为什么这样做？', '为什么不来？'],
        synonyms: ['为何', '为啥', '何故']
    },
    '哪里': {
        meaning: 'where',
        pronunciation: 'nǎ lǐ',
        pos: '疑问词',
        examples: ['你在哪里？', '哪里可以买到？'],
        synonyms: ['何处', '哪儿', '何地']
    },
    '什么时候': {
        meaning: 'when',
        pronunciation: 'shén me shí hòu',
        pos: '疑问词',
        examples: ['什么时候开始？', '什么时候回来？'],
        synonyms: ['何时', '啥时候', '几时']
    },
    '多少': {
        meaning: 'how many/much',
        pronunciation: 'duō shǎo',
        pos: '疑问词',
        examples: ['多少钱？', '多少个人？'],
        synonyms: ['几多', '若干', '几何']
    },
    '谁': {
        meaning: 'who',
        pronunciation: 'shéi',
        pos: '疑问词',
        examples: ['你是谁？', '谁在说话？'],
        synonyms: ['何人', '哪个', '啥人']
    },
    '哪个': {
        meaning: 'which',
        pronunciation: 'nǎ ge',
        pos: '疑问词',
        examples: ['你喜欢哪个？', '哪个更好？'],
        synonyms: ['何个', '啥个', '哪个']
    },
    '非常': {
        meaning: 'very, extremely',
        pronunciation: 'fēi cháng',
        pos: '副词',
        examples: ['非常高兴', '非常漂亮'],
        synonyms: ['很', '十分', '极其', '特别']
    },
    '很': {
        meaning: 'very, quite',
        pronunciation: 'hěn',
        pos: '副词',
        examples: ['很好', '很忙'],
        synonyms: ['非常', '十分', '挺', '相当']
    },
    '太': {
        meaning: 'too, extremely',
        pronunciation: 'tài',
        pos: '副词',
        examples: ['太好了', '太累了'],
        synonyms: ['过于', '过分', '极其']
    },
    '更': {
        meaning: 'more, even more',
        pronunciation: 'gèng',
        pos: '副词',
        examples: ['更好', '更喜欢'],
        synonyms: ['更加', '越发', '愈']
    },
    '最': {
        meaning: 'most, best',
        pronunciation: 'zuì',
        pos: '副词',
        examples: ['最好', '最喜欢'],
        synonyms: ['极其', '顶', '至']
    },
    
    // 中文词汇 - 专业词汇
    '计算机': {
        meaning: 'Computer',
        pronunciation: 'jì suàn jī',
        pos: '名词',
        examples: ['计算机科学', '使用计算机工作'],
        synonyms: ['电脑', '微机', 'PC']
    },
    '技术': {
        meaning: 'Technology',
        pronunciation: 'jì shù',
        pos: '名词',
        examples: ['现代技术', '技术发展'],
        synonyms: ['科技', '技艺', '技能']
    },
    '互联网': {
        meaning: 'Internet',
        pronunciation: 'hù lián wǎng',
        pos: '名词',
        examples: ['互联网时代', '上网冲浪'],
        synonyms: ['网络', '因特网', '万维网']
    },
    '软件': {
        meaning: 'Software',
        pronunciation: 'ruǎn jiàn',
        pos: '名词',
        examples: ['软件开发', '软件应用'],
        synonyms: ['程序', '应用', '系统']
    },
    '硬件': {
        meaning: 'Hardware',
        pronunciation: 'yìng jiàn',
        pos: '名词',
        examples: ['硬件设备', '硬件升级'],
        synonyms: ['设备', '器材', '装置']
    },
    '人工智能': {
        meaning: 'Artificial Intelligence',
        pronunciation: 'rén gōng zhì néng',
        pos: '名词',
        examples: ['人工智能技术', 'AI发展'],
        synonyms: ['AI', '机器智能', '智能系统']
    },
    '算法': {
        meaning: 'Algorithm',
        pronunciation: 'suàn fǎ',
        pos: '名词',
        examples: ['算法设计', '优化算法'],
        synonyms: ['程序', '方法', '步骤']
    },
    '数据库': {
        meaning: 'Database',
        pronunciation: 'shù jù kù',
        pos: '名词',
        examples: ['数据库管理', '数据存储'],
        synonyms: ['资料库', '信息库', '数据存储']
    },
    '网络': {
        meaning: 'Network',
        pronunciation: 'wǎng luò',
        pos: '名词',
        examples: ['网络连接', '社交网络'],
        synonyms: ['网路', '系统', '连接']
    },
    '健康': {
        meaning: 'Health',
        pronunciation: 'jiàn kāng',
        pos: '名词',
        examples: ['身体健康', '心理健康'],
        synonyms: ['康健', '健壮', '强健']
    },
    '医学': {
        meaning: 'Medicine',
        pronunciation: 'yī xué',
        pos: '名词',
        examples: ['现代医学', '医学研究'],
        synonyms: ['医术', '医疗', '医药']
    },
    '医生': {
        meaning: 'Doctor',
        pronunciation: 'yī shēng',
        pos: '名词',
        examples: ['医生诊断', '看医生'],
        synonyms: ['大夫', '医师', '医者']
    },
    '医院': {
        meaning: 'Hospital',
        pronunciation: 'yī yuàn',
        pos: '名词',
        examples: ['去医院', '医院治疗'],
        synonyms: ['病院', '医疗中心', '诊所']
    },
    '病人': {
        meaning: 'Patient',
        pronunciation: 'bìng rén',
        pos: '名词',
        examples: ['病人康复', '照顾病人'],
        synonyms: ['患者', '病号', '病者']
    },
    '手术': {
        meaning: 'Surgery',
        pronunciation: 'shǒu shù',
        pos: '名词',
        examples: ['手术成功', '外科手术'],
        synonyms: ['开刀', '治疗', '医疗']
    },
    '疾病': {
        meaning: 'Disease',
        pronunciation: 'jí bìng',
        pos: '名词',
        examples: ['预防疾病', '治疗疾病'],
        synonyms: ['病症', '病痛', '疾患']
    },
    '治疗': {
        meaning: 'Treatment',
        pronunciation: 'zhì liáo',
        pos: '名词',
        examples: ['接受治疗', '治疗方法'],
        synonyms: ['医治', '诊疗', '救治']
    },
    '症状': {
        meaning: 'Symptom',
        pronunciation: 'zhèng zhuàng',
        pos: '名词',
        examples: ['早期症状', '症状明显'],
        synonyms: ['征象', '病征', '表现']
    },
    '诊断': {
        meaning: 'Diagnosis',
        pronunciation: 'zhěn duàn',
        pos: '名词',
        examples: ['准确诊断', '诊断结果'],
        synonyms: ['确诊', '判定', '判断']
    },
    '法律': {
        meaning: 'Law',
        pronunciation: 'fǎ lǜ',
        pos: '名词',
        examples: ['法律条文', '遵守法律'],
        synonyms: ['法规', '法令', '法条']
    },
    '合法': {
        meaning: 'Legal',
        pronunciation: 'hé fǎ',
        pos: '形容词',
        examples: ['合法经营', '合法权利'],
        synonyms: ['正当', '合规', '依法']
    },
    '法院': {
        meaning: 'Court',
        pronunciation: 'fǎ yuàn',
        pos: '名词',
        examples: ['法院判决', '上法院'],
        synonyms: ['法庭', '司法机关', '审判机关']
    },
    '法官': {
        meaning: 'Judge',
        pronunciation: 'fǎ guān',
        pos: '名词',
        examples: ['法官审理', '法官判决'],
        synonyms: ['审判员', '司法官', '审判官']
    },
    '正义': {
        meaning: 'Justice',
        pronunciation: 'zhèng yì',
        pos: '名词',
        examples: ['追求正义', '社会正义'],
        synonyms: ['公道', '公正', '公平']
    },
    '权利': {
        meaning: 'Right',
        pronunciation: 'quán lì',
        pos: '名词',
        examples: ['基本权利', '维护权利'],
        synonyms: ['权益', '权力', '权限']
    },
    '正确': {
        meaning: 'Correct',
        pronunciation: 'zhèng què',
        pos: '形容词',
        examples: ['正确答案', '正确做法'],
        synonyms: ['对', '准确', '无误']
    },
    '错误': {
        meaning: 'Wrong',
        pronunciation: 'cuò wù',
        pos: '形容词/名词',
        examples: ['错误行为', '改正错误'],
        synonyms: ['错', '不对', '失误']
    },
    '犯罪': {
        meaning: 'Crime',
        pronunciation: 'fàn zuì',
        pos: '名词',
        examples: ['预防犯罪', '打击犯罪'],
        synonyms: ['罪行', '违法', '犯法']
    },
    '惩罚': {
        meaning: 'Punishment',
        pronunciation: 'chéng fá',
        pos: '名词',
        examples: ['受到惩罚', '惩罚措施'],
        synonyms: ['处罚', '制裁', '责罚']
    },
    '证据': {
        meaning: 'Evidence',
        pronunciation: 'zhèng jù',
        pos: '名词',
        examples: ['提供证据', '证据确凿'],
        synonyms: ['证明', '凭证', '证物']
    },
    '世界': {
        meaning: 'World, the earth',
        pronunciation: 'shì jiè',
        pos: '名词',
        examples: ['世界很大', '世界和平'],
        synonyms: ['地球', '天下', '全球']
    },
    '爱': {
        meaning: 'Love, affection',
        pronunciation: 'ài',
        pos: '名词/动词',
        examples: ['我爱你', '爱是美好的'],
        synonyms: ['喜欢', '热爱', '钟爱']
    },
    '美': {
        meaning: 'Beautiful, beauty',
        pronunciation: 'měi',
        pos: '形容词/名词',
        examples: ['她很美', '美的事物'],
        synonyms: ['漂亮', '美丽', '好看']
    },
    '朋友': {
        meaning: 'Friend, companion',
        pronunciation: 'péng yǒu',
        pos: '名词',
        examples: ['他是我的朋友', '好朋友互相帮助'],
        synonyms: ['友人', '伙伴', '同伴']
    },
    '家庭': {
        meaning: 'Family, household',
        pronunciation: 'jiā tíng',
        pos: '名词',
        examples: ['我爱我的家庭', '家庭很重要'],
        synonyms: ['家人', '家', '亲人']
    },
    '学校': {
        meaning: 'School, educational institution',
        pronunciation: 'xué xiào',
        pos: '名词',
        examples: ['我去学校', '学校很有趣'],
        synonyms: ['学堂', '学院', '学府']
    },
    '老师': {
        meaning: 'Teacher, instructor',
        pronunciation: 'lǎo shī',
        pos: '名词',
        examples: ['我的老师很善良', '老师帮助学生'],
        synonyms: ['教师', '先生', '导师']
    },
    '学生': {
        meaning: 'Student, pupil',
        pronunciation: 'xué shēng',
        pos: '名词',
        examples: ['我是学生', '学生努力学习'],
        synonyms: ['学子', '学员', '门生']
    },
    '书': {
        meaning: 'Book, volume',
        pronunciation: 'shū',
        pos: '名词',
        examples: ['我读书', '书是知识'],
        synonyms: ['书籍', '册子', '卷']
    },
    '水': {
        meaning: 'Water, liquid',
        pronunciation: 'shuǐ',
        pos: '名词',
        examples: ['我喝水', '水是必需的'],
        synonyms: ['液体', '水分', '水源']
    },
    '火': {
        meaning: 'Fire, flame',
        pronunciation: 'huǒ',
        pos: '名词',
        examples: ['火很热', '不要玩火'],
        synonyms: ['火焰', '烈火', '火光']
    },
    '山': {
        meaning: 'Mountain, hill',
        pronunciation: 'shān',
        pos: '名词',
        examples: ['山很高', '我爬山'],
        synonyms: ['山峰', '山岭', '山丘']
    },
    '海': {
        meaning: 'Sea, ocean',
        pronunciation: 'hǎi',
        pos: '名词',
        examples: ['海是蓝色的', '我在海里游泳'],
        synonyms: ['海洋', '大海', '海域']
    },
    '天': {
        meaning: 'Sky, heaven',
        pronunciation: 'tiān',
        pos: '名词',
        examples: ['天是蓝色的', '鸟在天上飞'],
        synonyms: ['天空', '苍穹', '天际']
    },
    '地': {
        meaning: 'Earth, ground',
        pronunciation: 'dì',
        pos: '名词',
        examples: ['地球是我们的家', '地是圆的'],
        synonyms: ['土地', '地面', '大地']
    },
    '人': {
        meaning: 'Person, human',
        pronunciation: 'rén',
        pos: '名词',
        examples: ['他是好人', '每个人都是独特的'],
        synonyms: ['个人', '人类', '人士']
    },
    '心': {
        meaning: 'Heart, mind',
        pronunciation: 'xīn',
        pos: '名词',
        examples: ['我的心跳很快', '他有善良的心'],
        synonyms: ['心脏', '内心', '心灵']
    },
    '时间': {
        meaning: 'Time, duration',
        pronunciation: 'shí jiān',
        pos: '名词',
        examples: ['时间飞逝', '现在几点了？'],
        synonyms: ['时刻', '时期', '时光']
    },
    '钱': {
        meaning: 'Money, cash',
        pronunciation: 'qián',
        pos: '名词',
        examples: ['我需要钱', '钱买不到幸福'],
        synonyms: ['金钱', '货币', '资金']
    },
    
    // 文言文词汇 - 基础词汇
    '汝好': {
        meaning: '你好（文言文）',
        pronunciation: 'rú hǎo',
        pos: '问候语',
        examples: ['汝好，久仰大名', '汝好，今日可好？'],
        synonyms: ['君好', '足下好', '阁下好']
    },
    '之': {
        meaning: '的，它，他',
        pronunciation: 'zhī',
        pos: '代词/助词',
        examples: ['学而时习之', '知之者不如好之者'],
        synonyms: ['其', '彼', '此']
    },
    '其': {
        meaning: '他的，它的，那个',
        pronunciation: 'qí',
        pos: '代词',
        examples: ['其为人也', '其志甚大'],
        synonyms: ['之', '彼', '厥']
    },
    '彼': {
        meaning: '那个，他',
        pronunciation: 'bǐ',
        pos: '代词',
        examples: ['彼君子兮', '彼何人斯'],
        synonyms: ['其', '之', '厥']
    },
    '此': {
        meaning: '这个，这样',
        pronunciation: 'cǐ',
        pos: '代词',
        examples: ['此心此意', '此乃天意'],
        synonyms: ['是', '斯', '兹']
    },
    '是': {
        meaning: '这，对，正确',
        pronunciation: 'shì',
        pos: '代词/形容词',
        examples: ['是故君子', '是非分明'],
        synonyms: ['此', '斯', '兹']
    },
    '斯': {
        meaning: '这，这样',
        pronunciation: 'sī',
        pos: '代词',
        examples: ['斯人也', '斯文扫地'],
        synonyms: ['此', '是', '兹']
    },
    '兹': {
        meaning: '这，现在',
        pronunciation: 'zī',
        pos: '代词',
        examples: ['兹事体大', '兹有要事'],
        synonyms: ['此', '斯', '是']
    },
    '厥': {
        meaning: '其，那个',
        pronunciation: 'jué',
        pos: '代词',
        examples: ['厥功甚伟', '厥后如何'],
        synonyms: ['其', '彼', '之']
    },
    '乃': {
        meaning: '是，就是，于是',
        pronunciation: 'nǎi',
        pos: '动词/连词',
        examples: ['乃天意也', '乃至于此'],
        synonyms: ['是', '即', '于是']
    },
    '即': {
        meaning: '就是，立即',
        pronunciation: 'jí',
        pos: '动词/副词',
        examples: ['即此是也', '即日启程'],
        synonyms: ['乃', '是', '立即']
    },
    '于': {
        meaning: '在，对于，比',
        pronunciation: 'yú',
        pos: '介词',
        examples: ['生于忧患', '重于泰山'],
        synonyms: ['在', '对', '比']
    },
    '以': {
        meaning: '用，因为，以便',
        pronunciation: 'yǐ',
        pos: '介词/连词',
        examples: ['以德报怨', '以儆效尤'],
        synonyms: ['用', '因', '为']
    },
    '为': {
        meaning: '做，成为，因为',
        pronunciation: 'wéi/wèi',
        pos: '动词/介词',
        examples: ['为人师表', '为天下先'],
        synonyms: ['做', '成', '因']
    },
    '与': {
        meaning: '和，给，参与',
        pronunciation: 'yǔ/yù',
        pos: '连词/动词',
        examples: ['与人为善', '与虎谋皮'],
        synonyms: ['和', '同', '及']
    },
    '及': {
        meaning: '和，到，赶上',
        pronunciation: 'jí',
        pos: '连词/动词',
        examples: ['及时行乐', '及第成名'],
        synonyms: ['和', '到', '赶']
    },
    '而': {
        meaning: '而且，但是，连接词',
        pronunciation: 'ér',
        pos: '连词',
        examples: ['学而时习之', '温故而知新'],
        synonyms: ['且', '但', '然']
    },
    '且': {
        meaning: '而且，暂且',
        pronunciation: 'qiě',
        pos: '连词/副词',
        examples: ['且慢', '且看下文'],
        synonyms: ['而', '又', '暂']
    },
    '然': {
        meaning: '这样，然而',
        pronunciation: 'rán',
        pos: '代词/连词',
        examples: ['然则如何', '然而不然'],
        synonyms: ['如', '但', '而']
    },
    '若': {
        meaning: '如果，像',
        pronunciation: 'ruò',
        pos: '连词/动词',
        examples: ['若有所失', '若即若离'],
        synonyms: ['如', '假', '似']
    },
    '如': {
        meaning: '像，如果',
        pronunciation: 'rú',
        pos: '动词/连词',
        examples: ['如鱼得水', '如临大敌'],
        synonyms: ['若', '似', '像']
    },
    '似': {
        meaning: '像，似乎',
        pronunciation: 'sì',
        pos: '动词/副词',
        examples: ['似是而非', '似曾相识'],
        synonyms: ['如', '若', '像']
    },
    '何': {
        meaning: '什么，为什么',
        pronunciation: 'hé',
        pos: '疑问词',
        examples: ['何去何从', '何乐而不为'],
        synonyms: ['什么', '为何', '怎么']
    },
    '孰': {
        meaning: '谁，什么',
        pronunciation: 'shú',
        pos: '疑问词',
        examples: ['孰是孰非', '孰能无过'],
        synonyms: ['谁', '何', '哪个']
    },
    '谁': {
        meaning: '谁',
        pronunciation: 'shéi',
        pos: '疑问词',
        examples: ['谁人不知', '谁与争锋'],
        synonyms: ['孰', '何人', '哪个']
    },
    '焉': {
        meaning: '哪里，怎么',
        pronunciation: 'yān',
        pos: '疑问词/语气词',
        examples: ['焉能如此', '心不在焉'],
        synonyms: ['哪里', '怎么', '何']
    },
    '安': {
        meaning: '怎么，哪里',
        pronunciation: 'ān',
        pos: '疑问词',
        examples: ['安能如此', '安得广厦'],
        synonyms: ['怎么', '哪里', '何']
    },
    '胡': {
        meaning: '为什么，怎么',
        pronunciation: 'hú',
        pos: '疑问词',
        examples: ['胡不归', '胡为乎来哉'],
        synonyms: ['何', '为什么', '怎么']
    },
    '奚': {
        meaning: '为什么，什么',
        pronunciation: 'xī',
        pos: '疑问词',
        examples: ['奚为而来', '奚以知其然'],
        synonyms: ['何', '为什么', '怎么']
    },
    '曷': {
        meaning: '为什么，何时',
        pronunciation: 'hé',
        pos: '疑问词',
        examples: ['曷为而来', '曷其有极'],
        synonyms: ['何', '为什么', '何时']
    },
    '恶': {
        meaning: '怎么，哪里',
        pronunciation: 'wū',
        pos: '疑问词',
        examples: ['恶乎知之', '恶在其为仁'],
        synonyms: ['何', '怎么', '哪里']
    },
    '盍': {
        meaning: '为什么不',
        pronunciation: 'hé',
        pos: '疑问词',
        examples: ['盍各言尔志', '盍归乎来'],
        synonyms: ['何不', '为什么不', '怎么不']
    },
    
    // 成语和俗语
    '学而时习之': {
        meaning: '学习后要经常复习',
        pronunciation: 'xué ér shí xí zhī',
        pos: '成语',
        examples: ['学而时习之，不亦说乎？', '学而时习之是学习的重要方法'],
        synonyms: ['温故知新', '反复练习', '勤学苦练']
    },
    '温故知新': {
        meaning: '温习旧知识，获得新理解',
        pronunciation: 'wēn gù zhī xīn',
        pos: '成语',
        examples: ['温故知新，可以为师矣', '通过温故知新提高学习效果'],
        synonyms: ['学而时习之', '温故而知新', '复习巩固']
    },
    '三人行必有我师': {
        meaning: '几个人一起走，其中一定有可以做我老师的人',
        pronunciation: 'sān rén xíng bì yǒu wǒ shī',
        pos: '成语',
        examples: ['三人行必有我师焉', '要虚心学习，三人行必有我师'],
        synonyms: ['虚心好学', '博采众长', '学无止境']
    },
    '学无止境': {
        meaning: '学习没有尽头',
        pronunciation: 'xué wú zhǐ jìng',
        pos: '成语',
        examples: ['学无止境，我们要不断学习', '知识更新快，学无止境'],
        synonyms: ['活到老学到老', '学海无涯', '学而不厌']
    },
    '活到老学到老': {
        meaning: '一辈子都要学习',
        pronunciation: 'huó dào lǎo xué dào lǎo',
        pos: '俗语',
        examples: ['活到老学到老，知识永远不够', '现代社会需要活到老学到老'],
        synonyms: ['学无止境', '终身学习', '学而不厌']
    },
    '学海无涯': {
        meaning: '知识的海洋没有边际',
        pronunciation: 'xué hǎi wú yá',
        pos: '成语',
        examples: ['学海无涯苦作舟', '面对学海无涯，我们要坚持不懈'],
        synonyms: ['学无止境', '知识无穷', '学而不厌']
    },
    '学而不厌': {
        meaning: '学习不感到厌倦',
        pronunciation: 'xué ér bù yàn',
        pos: '成语',
        examples: ['学而不厌，诲人不倦', '要有学而不厌的精神'],
        synonyms: ['学无止境', '勤学不倦', '好学不厌']
    },
    '诲人不倦': {
        meaning: '教导别人不感到疲倦',
        pronunciation: 'huì rén bù juàn',
        pos: '成语',
        examples: ['学而不厌，诲人不倦', '老师要有诲人不倦的精神'],
        synonyms: ['教导有方', '循循善诱', '耐心教导']
    },
    '博学多才': {
        meaning: '学识渊博，才能多样',
        pronunciation: 'bó xué duō cái',
        pos: '成语',
        examples: ['他博学多才，深受大家尊敬', '博学多才是现代人的追求'],
        synonyms: ['学富五车', '才高八斗', '博古通今']
    },
    '学富五车': {
        meaning: '学问渊博，读书很多',
        pronunciation: 'xué fù wǔ chē',
        pos: '成语',
        examples: ['他学富五车，知识面很广', '学富五车是学者的理想'],
        synonyms: ['博学多才', '才高八斗', '博古通今']
    },
    '才高八斗': {
        meaning: '才华很高',
        pronunciation: 'cái gāo bā dǒu',
        pos: '成语',
        examples: ['他才高八斗，文采飞扬', '才高八斗的人总是受人尊敬'],
        synonyms: ['学富五车', '博学多才', '才华横溢']
    },
    '博古通今': {
        meaning: '对古代和现代的事情都很了解',
        pronunciation: 'bó gǔ tōng jīn',
        pos: '成语',
        examples: ['他博古通今，知识渊博', '博古通今是学者的追求'],
        synonyms: ['学富五车', '博学多才', '才高八斗']
    },
    '才华横溢': {
        meaning: '才华出众，表现突出',
        pronunciation: 'cái huá héng yì',
        pos: '成语',
        examples: ['他才华横溢，作品深受欢迎', '才华横溢的年轻人'],
        synonyms: ['才高八斗', '才华出众', '才思敏捷']
    },
    '才思敏捷': {
        meaning: '思维敏捷，反应快',
        pronunciation: 'cái sī mǐn jié',
        pos: '成语',
        examples: ['他才思敏捷，回答问题很快', '才思敏捷是写作的重要条件'],
        synonyms: ['才华横溢', '思维敏捷', '反应迅速']
    },
    '思维敏捷': {
        meaning: '思考速度快，反应灵敏',
        pronunciation: 'sī wéi mǐn jié',
        pos: '成语',
        examples: ['他思维敏捷，学习能力强', '思维敏捷有助于解决问题'],
        synonyms: ['才思敏捷', '反应迅速', '头脑灵活']
    },
    '反应迅速': {
        meaning: '对刺激反应很快',
        pronunciation: 'fǎn yìng xùn sù',
        pos: '成语',
        examples: ['他反应迅速，动作敏捷', '反应迅速是运动员的基本素质'],
        synonyms: ['思维敏捷', '才思敏捷', '动作敏捷']
    },
    '头脑灵活': {
        meaning: '思维灵活，适应性强',
        pronunciation: 'tóu nǎo líng huó',
        pos: '成语',
        examples: ['他头脑灵活，善于变通', '头脑灵活的人容易成功'],
        synonyms: ['思维敏捷', '反应迅速', '机智灵活']
    },
    '机智灵活': {
        meaning: '聪明机智，灵活应变',
        pronunciation: 'jī zhì líng huó',
        pos: '成语',
        examples: ['他机智灵活，善于处理问题', '机智灵活是成功的重要因素'],
        synonyms: ['头脑灵活', '聪明机智', '随机应变']
    },
    '随机应变': {
        meaning: '根据情况灵活应对',
        pronunciation: 'suí jī yìng biàn',
        pos: '成语',
        examples: ['他随机应变，处理得很好', '随机应变是职场必备技能'],
        synonyms: ['机智灵活', '灵活应变', '见机行事']
    },
    '见机行事': {
        meaning: '看准时机行动',
        pronunciation: 'jiàn jī xíng shì',
        pos: '成语',
        examples: ['要见机行事，不能盲目行动', '见机行事是成功的关键'],
        synonyms: ['随机应变', '灵活应变', '把握时机']
    },
    '把握时机': {
        meaning: '抓住机会',
        pronunciation: 'bǎ wò shí jī',
        pos: '成语',
        examples: ['要把握时机，不要错过机会', '把握时机是成功的重要因素'],
        synonyms: ['见机行事', '抓住机会', '趁热打铁']
    },
    '抓住机会': {
        meaning: '把握住机会',
        pronunciation: 'zhuā zhù jī huì',
        pos: '俗语',
        examples: ['要抓住机会，不要让它溜走', '抓住机会就是抓住成功'],
        synonyms: ['把握时机', '见机行事', '趁热打铁']
    },
    '趁热打铁': {
        meaning: '趁着有利时机行动',
        pronunciation: 'chèn rè dǎ tiě',
        pos: '成语',
        examples: ['要趁热打铁，不要拖延', '趁热打铁是成功的关键'],
        synonyms: ['把握时机', '抓住机会', '见机行事']
    },
    '天下': {
        meaning: '世界，天下（文言文）',
        pronunciation: 'tiān xià',
        pos: '名词',
        examples: ['天下大势', '天下为公'],
        synonyms: ['世界', '寰宇', '四海']
    },
    '爱': {
        meaning: 'Love, affection（文言文）',
        pronunciation: 'ài',
        pos: '名词/动词',
        examples: ['吾爱汝', '爱乃美也'],
        synonyms: ['好', '悦', '钟']
    },
    '美': {
        meaning: 'Beautiful, beauty（文言文）',
        pronunciation: 'měi',
        pos: '形容词/名词',
        examples: ['彼女甚美', '美者，善也'],
        synonyms: ['丽', '好', '佳']
    },
    '友': {
        meaning: 'Friend, companion（文言文）',
        pronunciation: 'yǒu',
        pos: '名词',
        examples: ['彼乃吾友', '友者，助也'],
        synonyms: ['朋', '伴', '侣']
    },
    '家': {
        meaning: 'Family, household（文言文）',
        pronunciation: 'jiā',
        pos: '名词',
        examples: ['吾爱吾家', '家者，亲也'],
        synonyms: ['庭', '室', '户']
    },
    '庠序': {
        meaning: 'School, educational institution（文言文）',
        pronunciation: 'xiáng xù',
        pos: '名词',
        examples: ['吾往庠序', '庠序者，学也'],
        synonyms: ['学', '校', '塾']
    },
    '师': {
        meaning: 'Teacher, instructor（文言文）',
        pronunciation: 'shī',
        pos: '名词',
        examples: ['吾师甚善', '师者，传道也'],
        synonyms: ['先生', '夫子', '导师']
    },
    '生': {
        meaning: 'Student, pupil（文言文）',
        pronunciation: 'shēng',
        pos: '名词',
        examples: ['吾乃生也', '生者，学也'],
        synonyms: ['学子', '门生', '弟子']
    },
    '书': {
        meaning: 'Book, volume（文言文）',
        pronunciation: 'shū',
        pos: '名词',
        examples: ['吾读书', '书者，知也'],
        synonyms: ['册', '卷', '籍']
    },
    '水': {
        meaning: 'Water, liquid（文言文）',
        pronunciation: 'shuǐ',
        pos: '名词',
        examples: ['吾饮水', '水者，生也'],
        synonyms: ['液', '泉', '源']
    },
    '火': {
        meaning: 'Fire, flame（文言文）',
        pronunciation: 'huǒ',
        pos: '名词',
        examples: ['火甚热', '勿玩火'],
        synonyms: ['焰', '烈', '光']
    },
    '山': {
        meaning: 'Mountain, hill（文言文）',
        pronunciation: 'shān',
        pos: '名词',
        examples: ['山甚高', '吾登山'],
        synonyms: ['峰', '岭', '丘']
    },
    '海': {
        meaning: 'Sea, ocean（文言文）',
        pronunciation: 'hǎi',
        pos: '名词',
        examples: ['海乃蓝也', '吾游海'],
        synonyms: ['洋', '大', '域']
    },
    '天': {
        meaning: 'Sky, heaven（文言文）',
        pronunciation: 'tiān',
        pos: '名词',
        examples: ['天乃蓝也', '鸟飞于天'],
        synonyms: ['空', '穹', '际']
    },
    '地': {
        meaning: 'Earth, ground（文言文）',
        pronunciation: 'dì',
        pos: '名词',
        examples: ['地乃吾家', '地乃圆也'],
        synonyms: ['土', '面', '大']
    },
    '人': {
        meaning: 'Person, human（文言文）',
        pronunciation: 'rén',
        pos: '名词',
        examples: ['彼乃善人', '人皆独特'],
        synonyms: ['个', '类', '士']
    },
    '心': {
        meaning: 'Heart, mind（文言文）',
        pronunciation: 'xīn',
        pos: '名词',
        examples: ['吾心跳甚快', '彼有善心'],
        synonyms: ['脏', '内', '灵']
    },
    '时': {
        meaning: 'Time, duration（文言文）',
        pronunciation: 'shí',
        pos: '名词',
        examples: ['时飞逝', '今何时？'],
        synonyms: ['刻', '期', '光']
    },
    '钱': {
        meaning: 'Money, cash（文言文）',
        pronunciation: 'qián',
        pos: '名词',
        examples: ['吾需钱', '钱不买福'],
        synonyms: ['金', '币', '资']
    }
};

// AI对话历史
let chatHistory = [];

// DeepSeek 配置与调用
const deepseek = {
    enabled: false, // 开启后将使用 DeepSeek 在线回复
    baseURL: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat', // 或 'deepseek-reasoner'
    streamEnabled: true, // 新增：是否使用流式输出
    get apiKey() { return localStorage.getItem('DEEPSEEK_API_KEY') || ''; },
    setApiKey(key) { if (typeof key === 'string') localStorage.setItem('DEEPSEEK_API_KEY', key.trim()); }
};

// 预置 API Key 并默认启用（用户要求网页中可直接使用）
(function presetDeepSeekConfig() {
    try {
        const preset = 'sk-b408259772e14d3a80f4b42cd57ad99f';
        if (!localStorage.getItem('DEEPSEEK_API_KEY')) {
            localStorage.setItem('DEEPSEEK_API_KEY', preset);
        }
        deepseek.enabled = true;
    } catch (_) {
        deepseek.enabled = true;
    }
})();

async function callDeepSeek(messages, { stream = false, model = deepseek.model } = {}) {
    if (!deepseek.apiKey) throw new Error('缺少 DeepSeek API Key');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseek.apiKey}`
    };

    if (stream) headers['Accept'] = 'text/event-stream';

    const response = await fetch(`${deepseek.baseURL}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ model, messages, stream })
    });

    if (!response.ok) {
        let errDetail = '';
        try { errDetail = await response.text(); } catch (_) {}
        let hint = '';
        if (response.status === 401) hint = '（密钥无效或未授权）';
        else if (response.status === 402) hint = '（余额不足，请充值或更换密钥）';
        else if (response.status === 429) hint = '（超出速率限制，请稍后重试）';
        else if (response.status >= 500) hint = '（服务端异常，建议稍后重试）';
        const error = new Error(`HTTP ${response.status} ${hint} ${errDetail}`.trim());
        error.status = response.status;
        throw error;
    }

    if (!stream) {
        const json = await response.json();
        return json?.choices?.[0]?.message?.content || '';
    }

    // 浏览器环境下的 SSE 解析
    const reader = response.body?.getReader?.();
    if (!reader) {
        const fallbackJson = await response.json().catch(() => null);
        const content = fallbackJson?.choices?.[0]?.message?.content;
        if (content) return { nextChunk: async () => ({ done: true }) };
        throw new Error('当前环境不支持流式读取');
    }

    const decoder = new TextDecoder('utf-8');
    let done = false;
    let buffer = '';
    return {
        async nextChunk(onDelta) {
            if (done) return { done: true };
            const { value, done: streamDone } = await reader.read();
            if (streamDone) { done = true; return { done: true }; }
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed) continue;
                if (trimmed === 'data: [DONE]') { done = true; return { done: true }; }
                if (trimmed.startsWith('data: ')) {
                    try {
                        const json = JSON.parse(trimmed.slice(6));
                        const delta = json?.choices?.[0]?.delta?.content;
                        if (delta) onDelta(delta);
                    } catch (_) { /* 忽略解析错误 */ }
                }
            }
            return { done: false };
        }
    };
}

function ensureDeepSeekKeyInteractive() {
    if (deepseek.enabled && !deepseek.apiKey) {
        const key = window.prompt('请输入 DeepSeek API Key（仅本地存储）');
        if (key) {
            deepseek.setApiKey(key);
            showNotification('已保存 DeepSeek API Key');
        }
    }
}

// DeepSeek 设置面板（前端轻量 UI）
function createDeepSeekSettingsUI() {
    if (document.getElementById('deepseek-settings')) return;

    const panel = document.createElement('div');
    panel.id = 'deepseek-settings';
    panel.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 1001;
        background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
        box-shadow: 0 6px 24px rgba(0,0,0,0.12); padding: 12px; width: 280px;
        font-family: inherit; color: #111827;
    `;

    panel.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
            <div style="font-weight:700;">DeepSeek 在线对话</div>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;">
                <input id="deepseek-enable-toggle" type="checkbox" ${deepseek.enabled ? 'checked' : ''} /> 启用
            </label>
        </div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;">
                <input id="deepseek-stream-toggle" type="checkbox" ${deepseek.streamEnabled ? 'checked' : ''} /> 流式输出
            </label>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px;">
            <label for="deepseek-api-key" style="font-size:12px;color:#6b7280;">API Key（保存在本地）</label>
            <input id="deepseek-api-key" type="password" placeholder="sk-..." value="${deepseek.apiKey ? '••••••••••' : ''}" style="padding:8px 10px;border:1px solid #e5e7eb;border-radius:8px;outline:none;" />
        </div>
        <div style="display:flex;gap:8px;">
            <button id="deepseek-save" style="flex:1;padding:8px 10px;border:none;border-radius:8px;background:linear-gradient(45deg,#667eea,#764ba2);color:#fff;cursor:pointer;">保存</button>
            <button id="deepseek-test" style="flex:1;padding:8px 10px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;color:#374151;cursor:pointer;">测试</button>
        </div>
        <div id="deepseek-status" style="margin-top:8px;font-size:12px;color:#6b7280;"></div>
    `;

    document.body.appendChild(panel);

    const toggle = panel.querySelector('#deepseek-enable-toggle');
    const streamToggle = panel.querySelector('#deepseek-stream-toggle');
    const keyInput = panel.querySelector('#deepseek-api-key');
    const saveBtn = panel.querySelector('#deepseek-save');
    const testBtn = panel.querySelector('#deepseek-test');
    const status = panel.querySelector('#deepseek-status');

    function refreshStatus() {
        const ready = deepseek.enabled && !!deepseek.apiKey;
        status.textContent = ready ? '已就绪' : (deepseek.enabled ? '已启用（未配置密钥或余额不足）' : '未启用');
    }
    refreshStatus();

    toggle.addEventListener('change', () => {
        deepseek.enabled = toggle.checked;
        refreshStatus();
        showNotification(deepseek.enabled ? 'DeepSeek 已启用' : 'DeepSeek 已关闭');
        if (deepseek.enabled && !deepseek.apiKey) ensureDeepSeekKeyInteractive();
    });

    streamToggle.addEventListener('change', () => {
        deepseek.streamEnabled = streamToggle.checked;
        showNotification(deepseek.streamEnabled ? '流式输出已开启' : '流式输出已关闭');
    });

    saveBtn.addEventListener('click', () => {
        let val = keyInput.value.trim();
        if (!val || val === '••••••••••') {
            showNotification('未修改 API Key');
            return;
        }
        deepseek.setApiKey(val);
        keyInput.value = '••••••••••';
        showNotification('API Key 已保存到本地');
        refreshStatus();
    });

    testBtn.addEventListener('click', async () => {
        try {
            if (!deepseek.apiKey) return showNotification('请先填写并保存 API Key');
            if (deepseek.streamEnabled) {
                const holder = addMessage('测试连接中…', 'ai');
                const acc = { text: '' };
                const stream = await callDeepSeek([
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: '测试：用中文用一句话自我介绍。' }
                ], { stream: true });
                async function pump() {
                    const res = await stream.nextChunk((delta) => {
                        acc.text += delta;
                        const contentEl = holder.querySelector('.message-content');
                        if (contentEl) contentEl.textContent = acc.text;
                    });
                    if (!res.done) return pump();
                }
                await pump();
            } else {
                const reply = await callDeepSeek([
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: '测试：用中文用一句话自我介绍。' }
                ], { stream: false });
                addMessage(`测试成功：${reply || '（空）'}`, 'ai');
            }
        } catch (e) {
            addMessage(`测试失败：${e.message}`, 'ai');
        }
    });
}

// 在应用初始化后挂载设置面板
(function mountDeepSeekPanelWhenReady() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        createDeepSeekSettingsUI();
    } else {
        document.addEventListener('DOMContentLoaded', createDeepSeekSettingsUI);
    }
})();

// DOM元素
const elements = {
    navBtns: document.querySelectorAll('.nav-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    sourceLang: document.getElementById('sourceLang'),
    targetLang: document.getElementById('targetLang'),
    swapBtn: document.getElementById('swapLanguages'),
    sourceText: document.getElementById('sourceText'),
    translatedText: document.getElementById('translatedText'),
    translateBtn: document.getElementById('translateBtn'),
    clearInput: document.getElementById('clearInput'),
    listenInput: document.getElementById('listenInput'),
    copyResult: document.getElementById('copyResult'),
    listenOutput: document.getElementById('listenOutput'),
    // 文件翻译
    fileInput: document.getElementById('fileInput'),
    fileInfo: document.getElementById('fileInfo'),
    filePreview: document.getElementById('filePreview'),
    loadFileBtn: document.getElementById('loadFileBtn'),
    translateFileBtn: document.getElementById('translateFileBtn'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    searchResults: document.getElementById('searchResults'),
    chatInput: document.getElementById('chatInput'),
    sendBtn: document.getElementById('sendBtn'),
    chatMessages: document.getElementById('chatMessages'),
    // OCR
    imageInput: document.getElementById('imageInput'),
    imagePreview: document.getElementById('imagePreview'),
    ocrBtn: document.getElementById('ocrBtn'),
    ocrLang: document.getElementById('ocrLang'),
    ocrProgress: document.getElementById('ocrProgress')
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 扩充语料库的英文词条首字母大小写变体
    try {
        addCaseVariantsToTranslationData();
        addCaseVariantsToWordDatabase();
    } catch (_) {}
    setupEventListeners();
    setupLanguageOptions();
}

function setupEventListeners() {
    // 导航切换
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 翻译功能
    elements.swapBtn.addEventListener('click', swapLanguages);
    elements.translateBtn.addEventListener('click', translateText);
    elements.clearInput.addEventListener('click', clearInput);
    elements.listenInput.addEventListener('click', () => speakText(elements.sourceText.value, elements.sourceLang.value));
    elements.copyResult.addEventListener('click', copyResult);
    elements.listenOutput.addEventListener('click', () => speakText(elements.translatedText.textContent, elements.targetLang.value));

    // 文件翻译
    if (elements.fileInput) {
        elements.fileInput.addEventListener('change', handleTextFileSelect);
    }
    if (elements.loadFileBtn) {
        elements.loadFileBtn.addEventListener('click', () => loadTextFile(false));
    }
    if (elements.translateFileBtn) {
        elements.translateFileBtn.addEventListener('click', () => loadTextFile(true));
    }

    // 搜索功能
    elements.searchBtn.addEventListener('click', searchWord);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWord();
    });

    // 聊天功能
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // 实时翻译
    elements.sourceText.addEventListener('input', debounce(translateText, 500));

    // OCR 事件
    if (elements.imageInput) {
        elements.imageInput.addEventListener('change', handleImageSelect);
    }
    if (elements.ocrBtn) {
        elements.ocrBtn.addEventListener('click', runOCRAndTranslate);
    }
}

function setupLanguageOptions() {
    // 根据源语言自动调整目标语言选项
    elements.sourceLang.addEventListener('change', function() {
        const sourceLang = this.value;
        const targetOptions = elements.targetLang.querySelectorAll('option');
        
        targetOptions.forEach(option => {
            option.style.display = option.value === sourceLang ? 'none' : 'block';
        });
        
        // 自动选择不同的目标语言
        if (elements.targetLang.value === sourceLang) {
            const availableOptions = Array.from(targetOptions).filter(opt => opt.value !== sourceLang);
            if (availableOptions.length > 0) {
                elements.targetLang.value = availableOptions[0].value;
            }
        }
    });
}

function switchTab(tabName) {
    // 更新导航按钮状态
    elements.navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // 更新内容显示
    elements.tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabName);
    });

    currentTab = tabName;
}

function swapLanguages() {
    const sourceLang = elements.sourceLang.value;
    const targetLang = elements.targetLang.value;
    
    elements.sourceLang.value = targetLang;
    elements.targetLang.value = sourceLang;
    
    // 交换文本内容
    const sourceText = elements.sourceText.value;
    const translatedText = elements.translatedText.textContent;
    
    elements.sourceText.value = translatedText;
    elements.translatedText.textContent = sourceText;
}


function clearInput() {
    elements.sourceText.value = '';
    elements.translatedText.textContent = '';
}

function copyResult() {
    const text = elements.translatedText.textContent;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('已复制到剪贴板');
        });
    }
}

function speakText(text, lang) {
    if (!text) return;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // 设置语言
        const langMap = {
            'zh': 'zh-CN',
            'en': 'en-US',
            'classical': 'zh-CN'
        };
        
        utterance.lang = langMap[lang] || 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        speechSynthesis.speak(utterance);
    } else {
        showNotification('您的浏览器不支持语音合成');
    }
}

function translateText() {
    const sourceText = elements.sourceText.value.trim();
    if (!sourceText) {
        elements.translatedText.textContent = '';
        return;
    }

    if (isTranslating) return;
    isTranslating = true;

    // 显示加载状态
    elements.translateBtn.innerHTML = '<div class="loading"></div> 翻译中...';
    elements.translateBtn.disabled = true;

    const sourceLang = elements.sourceLang.value;
    const targetLang = elements.targetLang.value;

    (async () => {
        try {
            // 优先使用 DeepSeek 在线翻译
            if (deepseek.enabled && deepseek.apiKey) {
                const sys = {
                    role: 'system',
                    content: 'You are an expert bilingual translator. Translate precisely between Chinese, English, and Classical Chinese. Preserve meaning, style, and formatting. Output only the translation without extra commentary.'
                };
                const prompt = {
                    role: 'user',
                    content: `Source language: ${sourceLang}\nTarget language: ${targetLang}\nText:\n${sourceText}`
                };
                // 使用非流式以简化 UI
                const result = await callDeepSeek([sys, prompt], { stream: false, model: deepseek.model });
                elements.translatedText.textContent = result || '';
            } else {
                // 本地词典/规则回退
                const translationKey = `${sourceLang}-${targetLang}`;
                let translatedText = '';
                if (translationData[translationKey]) {
                    translatedText = intelligentTranslate(sourceText, translationKey);
                } else {
                    translatedText = `[${sourceLang} → ${targetLang}] ${sourceText}`;
                }
                elements.translatedText.textContent = translatedText;
            }
        } catch (err) {
            // DeepSeek 出错时的处理（含 402 余额不足）
            if (err && (err.status === 402 || String(err.message).includes('HTTP 402'))) {
                showNotification('DeepSeek 余额不足，已关闭在线模式并回退本地翻译');
                deepseek.enabled = false;
                refreshDeepSeekStatusPanel();
            } else {
                showNotification(`在线翻译失败，已回退本地：${err.message}`);
            }
            // 回退本地翻译
            const translationKey = `${sourceLang}-${targetLang}`;
            let translatedText = '';
            if (translationData[translationKey]) {
                translatedText = intelligentTranslate(sourceText, translationKey);
            } else {
                translatedText = `[${sourceLang} → ${targetLang}] ${sourceText}`;
            }
            elements.translatedText.textContent = translatedText;
        } finally {
            // 恢复按钮状态
            elements.translateBtn.innerHTML = '<i class="fas fa-language"></i> 开始翻译';
            elements.translateBtn.disabled = false;
            isTranslating = false;
        }
    })();
}

// 智能翻译算法
function intelligentTranslate(text, translationKey) {
    const dictionary = translationData[translationKey];
    
    // 1. 完全匹配（大小写容错）
    const direct = dictionary[text] || dictionary[text?.toLowerCase?.()] || dictionary[toCapFirst(text?.toLowerCase?.())];
    if (direct) return direct;
    
    // 2. 短语匹配（按长度降序）。加入简单的首字母大写变体列表
    const keys = Object.keys(dictionary);
    const phraseList = Array.from(new Set([
        ...keys,
        ...keys.filter(isEnglishWordKey).map(k => toCapFirst(k.toLowerCase()))
    ])).sort((a, b) => b.length - a.length);
    
    let result = text;
    for (const phrase of phraseList) {
        if (!phrase) continue;
        if (result.includes(phrase)) {
            result = result.replace(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), dictionary[phrase]);
        }
    }
    
    // 3. 逐词翻译（保留空白与换行，大小写容错）
    // 将空白作为独立 token，这样换行/空格会原样保留
    const tokens = result.split(/(\s+)/);
    const translatedTokens = tokens.map(token => {
        // 纯空白，直接返回
        if (/^\s+$/.test(token) || token === '') return token;

        // 纯标点或符号，尝试直接映射
        if (!/[\w\u4e00-\u9fff'-]+/.test(token)) {
            return dictionary[token] ?? token;
        }

        // 拆分前后标点，避免重复添加标点
        const match = token.match(/^([^\w\u4e00-\u9fff'-]*)([\w\u4e00-\u9fff'-]+)([^\w\u4e00-\u9fff'-]*)$/);
        if (!match) return token;

        const [, leading, core, trailing] = match;
        const lower = core.toLowerCase();
        const cap = toCapFirst(lower);
        const mapped = dictionary[core] || dictionary[lower] || dictionary[cap] || core;

        // 如果尾部标点在词典中有映射，按映射替换，否则保留
        const mappedTrailing = dictionary[trailing] ?? trailing;
        return `${leading}${mapped}${mappedTrailing}`;
    });

    return translatedTokens.join('');
}

// 改进的搜索功能
function searchWord() {
    const query = elements.searchInput.value.trim().toLowerCase();
    if (!query) return;

    elements.searchResults.innerHTML = '';

    // 搜索匹配的单词
    const results = [];
    for (const [word, data] of Object.entries(wordDatabase)) {
        const searchText = `${word} ${data.meaning} ${data.pos} ${data.synonyms.join(' ')}`.toLowerCase();
        if (searchText.includes(query)) {
            results.push({ word, data });
        }
    }

    if (results.length === 0) {
        elements.searchResults.innerHTML = `
            <div class="search-item">
                <div class="search-word">未找到结果</div>
                <div class="search-meaning">请尝试其他搜索词，或检查拼写</div>
            </div>
        `;
        return;
    }

    // 按相关性排序
    results.sort((a, b) => {
        const aScore = calculateRelevanceScore(query, a.word, a.data);
        const bScore = calculateRelevanceScore(query, b.word, b.data);
        return bScore - aScore;
    });

    results.forEach(({ word, data }) => {
        const searchItem = document.createElement('div');
        searchItem.className = 'search-item';
        searchItem.innerHTML = `
            <div class="search-word">${word}</div>
            <div class="search-meaning">
                <div class="word-info">
                    <span class="pos-tag">${data.pos}</span>
                    <span class="pronunciation">${data.pronunciation}</span>
                </div>
                <div class="definition">
                    <strong>含义：</strong>${data.meaning}
                </div>
                ${data.synonyms ? `
                <div class="synonyms">
                    <strong>同义词：</strong>${data.synonyms.join(', ')}
                </div>
                ` : ''}
                <div class="examples">
                    <strong>例句：</strong>
                    <ul style="margin-top: 8px; padding-left: 20px;">
                        ${data.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        elements.searchResults.appendChild(searchItem);
    });
}

// 计算搜索相关性分数
function calculateRelevanceScore(query, word, data) {
    let score = 0;
    
    // 完全匹配得分最高
    if (word.toLowerCase() === query) score += 100;
    else if (word.toLowerCase().includes(query)) score += 50;
    
    // 含义匹配
    if (data.meaning.toLowerCase().includes(query)) score += 30;
    
    // 同义词匹配
    if (data.synonyms) {
        data.synonyms.forEach(synonym => {
            if (synonym.toLowerCase().includes(query)) score += 20;
        });
    }
    
    // 例句匹配
    data.examples.forEach(example => {
        if (example.toLowerCase().includes(query)) score += 10;
    });
    
    return score;
}

function sendMessage() {
    const message = elements.chatInput.value.trim();
    if (!message) return;

    const userNode = addMessage(message, 'user');
    elements.chatInput.value = '';

    if (deepseek.enabled) {
        ensureDeepSeekKeyInteractive();
    }

    if (deepseek.enabled && deepseek.apiKey) {
        const userMessage = { role: 'user', content: message };
        const systemPrompt = { role: 'system', content: 'You are a helpful assistant for multilingual tasks (Chinese, English, Classical Chinese).' };

        if (deepseek.streamEnabled) {
            const holder = addMessage('正在思考…', 'ai');
            const acc = { text: '' };
            (async () => {
                try {
                    const stream = await callDeepSeek([systemPrompt, userMessage], { stream: true });
                    async function pump() {
                        const res = await stream.nextChunk((delta) => {
                            acc.text += delta;
                            const contentEl = holder.querySelector('.message-content');
                            if (contentEl) contentEl.textContent = acc.text;
                        });
                        if (!res.done) return pump();
                    }
                    await pump();
                } catch (err) {
                    if (err && (err.status === 402 || String(err.message).includes('HTTP 402'))) {
                        showNotification('DeepSeek 余额不足，已关闭在线模式并回退本地回复');
                        deepseek.enabled = false;
                        refreshDeepSeekStatusPanel();
                    }
                    try {
                        const content = await callDeepSeek([systemPrompt, userMessage], { stream: false });
                        addMessage(content || '（无内容返回）', 'ai');
                    } catch (err2) {
                        addMessage(`在线调用失败，已回退本地回复。错误：${err2.message}`, 'ai');
                        const aiResponse = generateAIResponse(message);
                        addMessage(aiResponse, 'ai');
                    }
                }
            })();
            return;
        }

        const thinkingNode = addMessage('正在思考…', 'ai');
        (async () => {
            try {
                const content = await callDeepSeek([systemPrompt, userMessage], { stream: false });
                addMessage(content || '（无内容返回）', 'ai');
            } catch (err) {
                if (err && (err.status === 402 || String(err.message).includes('HTTP 402'))) {
                    showNotification('DeepSeek 余额不足，已关闭在线模式并回退本地回复');
                    deepseek.enabled = false;
                    refreshDeepSeekStatusPanel();
                }
                addMessage(`在线调用失败，已回退本地回复。错误：${err.message}`, 'ai');
                const aiResponse = generateAIResponse(message);
                addMessage(aiResponse, 'ai');
            }
        })();
        return;
    }

    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessage(aiResponse, 'ai');
    }, 600);
}

function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-time">${timeString}</div>
    `;

    elements.chatMessages.appendChild(messageDiv);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;

    // 保存到历史记录
    chatHistory.push({ content, sender, time: now });
    return messageDiv; // 新增：返回节点以便实时更新
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // 翻译相关回复
    if (message.includes('翻译') || message.includes('translate')) {
        return '我可以帮您进行中文、英文和文言文之间的翻译。请使用翻译功能，或者直接告诉我您想翻译的内容。';
    }
    
    // 搜索相关回复
    if (message.includes('搜索') || message.includes('search') || message.includes('单词')) {
        return '您可以使用搜索功能来查找单词的含义、发音和例句。只需在搜索框中输入您想查询的单词即可。';
    }
    
    // 问候语回复
    if (message.includes('你好') || message.includes('hello') || message.includes('hi')) {
        return '您好！我是您的多功能跨模态汉语言智能处理平台AI助手。我可以帮您进行翻译、解释单词含义，或回答任何问题。有什么可以帮助您的吗？';
    }
    
    // 功能介绍
    if (message.includes('功能') || message.includes('能做什么')) {
        return '我具备以下功能：<br>1. 中文、英文、文言文互译<br>2. 单词搜索和解释<br>3. 语音朗读<br>4. AI对话交流<br>请选择相应的功能开始使用！';
    }
    
    // 默认回复
    const responses = [
        '这是一个很有趣的问题！让我想想...',
        '我理解您的问题，让我为您详细解答。',
        '根据我的理解，您想了解的是...',
        '这是一个很好的问题！我的建议是...',
        '让我帮您分析一下这个问题...'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + ' 如果您需要翻译或搜索功能，请使用相应的功能模块。';
}

function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3秒后移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 添加额外的CSS动画和效果
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .search-item {
        animation: fadeInUp 0.5s ease;
    }
    
    .message {
        animation: bounceIn 0.5s ease;
    }
    
    .translate-btn:active {
        transform: scale(0.98);
    }
    
    .action-btn:active {
        transform: scale(0.95);
    }
    
    .nav-btn:active {
        transform: scale(0.98);
    }
`;
document.head.appendChild(style);

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter 翻译
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (currentTab === 'translate') {
            translateText();
        }
    }
    
    // Ctrl/Cmd + K 搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        switchTab('search');
        elements.searchInput.focus();
    }
    
    // Ctrl/Cmd + J 聊天
    if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        switchTab('chat');
        elements.chatInput.focus();
    }
    
    // Ctrl/Cmd + T 翻译
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        switchTab('translate');
        elements.sourceText.focus();
    }
});

// 添加输入提示功能
function addInputHints() {
    const hints = {
        'zh': ['你好', '世界', '学习', '朋友', '家庭'],
        'en': ['Hello', 'World', 'Study', 'Friend', 'Family'],
        'classical': ['汝好', '天下', '学', '友', '家']
    };
    
    elements.sourceText.addEventListener('focus', function() {
        const lang = elements.sourceLang.value;
        const hint = hints[lang] ? hints[lang][Math.floor(Math.random() * hints[lang].length)] : '';
        if (!this.value && hint) {
            this.placeholder = `试试输入: ${hint}`;
        }
    });
    
    elements.sourceText.addEventListener('blur', function() {
        this.placeholder = '请输入要翻译的文本...';
    });
}

// 添加搜索建议功能
function addSearchSuggestions() {
    const suggestions = Object.keys(wordDatabase).slice(0, 5);
    let suggestionIndex = 0;
    
    elements.searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            suggestionIndex = Math.min(suggestionIndex + 1, suggestions.length - 1);
            this.value = suggestions[suggestionIndex];
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            suggestionIndex = Math.max(suggestionIndex - 1, 0);
            this.value = suggestions[suggestionIndex];
        }
    });
}

// 添加打字机效果
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// 改进的AI回复生成
function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // 翻译相关回复
    if (message.includes('翻译') || message.includes('translate')) {
        return '我可以帮您进行中文、英文和文言文之间的翻译。请使用翻译功能，或者直接告诉我您想翻译的内容。';
    }
    
    // 搜索相关回复
    if (message.includes('搜索') || message.includes('search') || message.includes('单词')) {
        return '您可以使用搜索功能来查找单词的含义、发音和例句。只需在搜索框中输入您想查询的单词即可。';
    }
    
    // 问候语回复
    if (message.includes('你好') || message.includes('hello') || message.includes('hi')) {
        return '您好！我是您的多功能跨模态汉语言智能处理平台AI助手。我可以帮您进行翻译、解释单词含义，或回答任何问题。有什么可以帮助您的吗？';
    }
    
    // 功能介绍
    if (message.includes('功能') || message.includes('能做什么')) {
        return '我具备以下功能：<br>1. 中文、英文、文言文互译<br>2. 单词搜索和解释<br>3. 语音朗读<br>4. AI对话交流<br>请选择相应的功能开始使用！';
    }
    
    // 文言文相关
    if (message.includes('文言文') || message.includes('古文')) {
        return '文言文是古代汉语的书面语言，具有简洁典雅的特点。我可以帮您翻译文言文，或者解释古汉语词汇的含义。';
    }
    
    // 学习相关
    if (message.includes('学习') || message.includes('study') || message.includes('learn')) {
        return '学习语言是一个持续的过程！建议您：<br>1. 多练习翻译<br>2. 积累词汇量<br>3. 阅读例句<br>4. 使用语音功能练习发音';
    }
    
    // 默认回复
    const responses = [
        '这是一个很有趣的问题！让我想想...',
        '我理解您的问题，让我为您详细解答。',
        '根据我的理解，您想了解的是...',
        '这是一个很好的问题！我的建议是...',
        '让我帮您分析一下这个问题...'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + ' 如果您需要翻译或搜索功能，请使用相应的功能模块。';
}

// 初始化额外功能
document.addEventListener('DOMContentLoaded', function() {
    addInputHints();
    addSearchSuggestions();
    
    // 添加欢迎动画
    setTimeout(() => {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.animation = 'fadeInUp 0.8s ease';
        }
    }, 100);
});

function refreshDeepSeekStatusPanel() {
    const status = document.getElementById('deepseek-status');
    const toggle = document.getElementById('deepseek-enable-toggle');
    if (typeof deepseek !== 'undefined') {
        const ready = deepseek.enabled && !!deepseek.apiKey;
        if (status) status.textContent = ready ? '已就绪' : (deepseek.enabled ? '已启用（未配置密钥或余额不足）' : '未启用');
        if (toggle) toggle.checked = !!deepseek.enabled;
    }
}

// 文件翻译
function formatFileSize(bytes) {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
}

function isSupportedTextFile(file) {
    if (!file) return false;
    const name = (file.name || '').toLowerCase();
    return SUPPORTED_TEXT_EXTS.some(ext => name.endsWith(ext)) || 
           (file.type && (file.type.startsWith('text/') || 
                          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                          file.type === 'application/pdf'));
}

async function readFileAsText(file) {
    const fileName = (file.name || '').toLowerCase();
    
    // 处理 PDF 文件
    if (fileName.endsWith('.pdf') || file.type === 'application/pdf') {
        return await readPDFFile(file);
    }
    
    // 处理 DOCX 文件
    if (fileName.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return await readDOCXFile(file);
    }
    
    // 处理普通文本文件
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result || '');
        reader.onerror = () => reject(reader.error || new Error('无法读取文件'));
        reader.readAsText(file);
    });
}

// 读取 PDF 文件内容
async function readPDFFile(file) {
    try {
        // 初始化 PDF.js worker
        if (typeof pdfjsLib === 'undefined') {
            throw new Error('PDF.js 库未加载');
        }
        
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let fullText = '';
        const numPages = pdf.numPages;
        
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }
        
        return fullText.trim();
    } catch (error) {
        throw new Error(`PDF 解析失败: ${error.message || error}`);
    }
}

// 读取 DOCX 文件内容
async function readDOCXFile(file) {
    try {
        if (typeof mammoth === 'undefined') {
            throw new Error('Mammoth.js 库未加载');
        }
        
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
        
        if (result.messages && result.messages.length > 0) {
            console.warn('DOCX 解析警告:', result.messages);
        }
        
        return result.value || '';
    } catch (error) {
        throw new Error(`DOCX 解析失败: ${error.message || error}`);
    }
}

function handleTextFileSelect() {
    const file = elements.fileInput?.files?.[0];
    if (elements.filePreview) elements.filePreview.textContent = '';
    if (!file) {
        if (elements.fileInfo) elements.fileInfo.textContent = '未选择文件';
        return;
    }
    if (!isSupportedTextFile(file)) {
        showNotification('暂仅支持文本类文件（txt、md、csv、json、srt、docx、pdf 等）');
        elements.fileInput.value = '';
        if (elements.fileInfo) elements.fileInfo.textContent = '未选择文件';
        return;
    }
    if (file.size > FILE_SIZE_LIMIT) {
        showNotification(`文件过大，需小于 ${FILE_SIZE_LIMIT / (1024 * 1024)} MB`);
        elements.fileInput.value = '';
        if (elements.fileInfo) elements.fileInfo.textContent = '未选择文件';
        return;
    }

    if (elements.fileInfo) {
        elements.fileInfo.textContent = `${file.name} · ${formatFileSize(file.size)}`;
    }

    // 预览文件内容
    const fileName = (file.name || '').toLowerCase();
    if (fileName.endsWith('.pdf') || fileName.endsWith('.docx')) {
        // PDF 和 DOCX 文件预览需要异步处理
        if (elements.filePreview) {
            elements.filePreview.textContent = '正在加载预览...';
        }
        readFileAsText(file).then(text => {
            const snippet = String(text || '').slice(0, 800);
            if (elements.filePreview) {
                elements.filePreview.textContent = snippet || '文件为空';
                if (text.length > 800) {
                    elements.filePreview.textContent += '\n…';
                }
            }
        }).catch(err => {
            if (elements.filePreview) {
                elements.filePreview.textContent = `预览失败: ${err.message || err}`;
            }
        });
    } else {
        // 普通文本文件预览
        const reader = new FileReader();
        reader.onload = () => {
            const text = String(reader.result || '');
            const snippet = text.slice(0, 800);
            if (elements.filePreview) {
                elements.filePreview.textContent = snippet || '文件为空';
                if (text.length > 800) {
                    elements.filePreview.textContent += '\n…';
                }
            }
        };
        reader.onerror = () => {
            if (elements.filePreview) elements.filePreview.textContent = '预览失败';
        };
        reader.readAsText(file);
    }
}

async function loadTextFile(autoTranslate = false) {
    const file = elements.fileInput?.files?.[0];
    if (!file) {
        showNotification('请先选择文件');
        return;
    }
    if (!isSupportedTextFile(file)) {
        showNotification('暂仅支持文本类文件（txt、md、csv、json、srt、docx、pdf 等）');
        return;
    }
    if (file.size > FILE_SIZE_LIMIT) {
        showNotification(`文件过大，需小于 ${FILE_SIZE_LIMIT / (1024 * 1024)} MB`);
        return;
    }

    if (elements.loadFileBtn) elements.loadFileBtn.disabled = true;
    if (elements.translateFileBtn) elements.translateFileBtn.disabled = true;
    if (elements.fileInfo) elements.fileInfo.textContent = `${file.name} · ${formatFileSize(file.size)} · 正在载入...`;

    try {
        const text = await readFileAsText(file);
        const normalized = String(text || '').replace(/^\uFEFF/, '');
        elements.sourceText.value = normalized;
        if (elements.fileInfo) {
            elements.fileInfo.textContent = `${file.name} · ${formatFileSize(file.size)} · 已载入${autoTranslate ? '并翻译' : ''}`;
        }
        if (normalized.length === 0) {
            showNotification('文件内容为空');
            return;
        }
        if (autoTranslate) {
            showNotification('文件已载入，开始翻译');
            translateText();
        } else {
            showNotification('文件内容已填入输入框');
        }
    } catch (err) {
        showNotification(`文件读取失败：${err.message || err}`);
        if (elements.fileInfo) elements.fileInfo.textContent = '读取失败';
    } finally {
        if (elements.loadFileBtn) elements.loadFileBtn.disabled = false;
        if (elements.translateFileBtn) elements.translateFileBtn.disabled = false;
    }
}

function handleImageSelect() {
    const files = elements.imageInput?.files;
    elements.imagePreview.innerHTML = '';
    if (!files || files.length === 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url;
    elements.imagePreview.appendChild(img);
}

function mapOcrLangToTesseract(lang) {
    // zh -> chi_sim; en -> eng
    if (lang === 'zh' || lang === 'classical') return 'chi_sim';
    return 'eng';
}

async function runOCRAndTranslate() {
    const files = elements.imageInput?.files;
    if (!files || files.length === 0) {
        showNotification('请先选择一张图片');
        return;
    }
    const file = files[0];
    const lang = elements.ocrLang ? elements.ocrLang.value : 'zh';
    const tessLang = mapOcrLangToTesseract(lang);

    if (!(window.Tesseract && window.Tesseract.recognize)) {
        showNotification('OCR 引擎未加载，请稍后重试');
        return;
    }

    elements.ocrProgress.style.display = 'block';
    elements.ocrProgress.textContent = '正在识别... 0%';

    try {
        const { data } = await Tesseract.recognize(file, tessLang, {
            logger: m => {
                if (m && m.status === 'recognizing text' && typeof m.progress === 'number') {
                    const percent = Math.round(m.progress * 100);
                    elements.ocrProgress.textContent = `正在识别... ${percent}%`;
                }
            }
        });
        const text = (data && data.text) ? data.text.trim() : '';
        if (!text) {
            elements.ocrProgress.textContent = '未识别到文字';
            showNotification('未识别到文字');
            return;
        }
        elements.ocrProgress.textContent = '识别完成，已填入输入框';
        elements.sourceText.value = text;
        // 根据 OCR 语言，自动设置源语言
        if (elements.sourceLang) {
            elements.sourceLang.value = (lang === 'en') ? 'en' : 'zh';
        }
        // 自动翻译
        translateText();
    } catch (e) {
        elements.ocrProgress.textContent = `识别失败：${e.message || e}`;
        showNotification(`OCR 识别失败：${e.message || e}`);
    } finally {
        setTimeout(() => { elements.ocrProgress.style.display = 'none'; }, 1200);
    }
}

// 辅助：首字母大小写适配
function isEnglishWordKey(key) {
    return /^[A-Za-z][A-Za-z\-']*$/.test(key);
}
function toCapFirst(s) {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function addCaseVariantsToMap(mapObj) {
    const additions = {};
    Object.keys(mapObj).forEach(k => {
        if (!isEnglishWordKey(k)) return;
        const lower = k.toLowerCase();
        const cap = toCapFirst(k);
        const v = mapObj[k];
        if (mapObj[lower] === undefined) additions[lower] = v;
        if (mapObj[cap] === undefined) additions[cap] = v;
    });
    Object.assign(mapObj, additions);
}
function addCaseVariantsToTranslationData() {
    // 仅对英文作为"源语言键"的映射添加变体
    ['en-zh', 'en-classical', 'classical-en', 'zh-en'].forEach(key => {
        const m = translationData[key];
        if (!m) return;
        // 对英文键起作用
        addCaseVariantsToMap(m);
    });
}
function addCaseVariantsToWordDatabase() {
    const additions = {};
    Object.keys(wordDatabase).forEach(k => {
        if (!isEnglishWordKey(k)) return;
        const lower = k.toLowerCase();
        const cap = toCapFirst(k);
        const v = wordDatabase[k];
        if (wordDatabase[lower] === undefined) additions[lower] = v;
        if (wordDatabase[cap] === undefined) additions[cap] = v;
    });
    Object.assign(wordDatabase, additions);
}
