# vite + vue3 + ts + vue router + pinia 

## 
node：v18.19.0
pnpm:：v8.13.1

## 初始代码
1. 安装pnpm npm i -g pnpm
2. 创建项目 pnpm create vite@latest 项目名称 -- --template 模板
3. 配置 tsconfig， 修改 tsconfig.node.json
4. src/typings.d.ts 声明window上自定义属性，如事件总线，声明.vue文件
5. 修改package.json 运行pnpm run ts 即可查看文件是否有ts类型错误
6. 配置路径别名 pnpm i @types/node -D ， 在 vite.config.ts中进行配置别名， ts 路径映射，在tsconfig.json时通过baseUrl与paths属性已完成
7. 配置 ESLint 和 prettier
8. 修改package.json
    "scripts": {
        "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx --max-warnings 0"
    }
    运行 pnpm run lint，可以看到eslint(prettier/prettier)问题都将被修复
9. 配置 husky、lint-staged、@commitlint/cli


## ESLint 和 prettier
1. eslint 安装 pnpm i eslint -D
2. eslint vue插件安装 pnpm i eslint-plugin-vue -D
3. eslint 识别ts语法 pnpm i @typescript-eslint/parser -D
4. eslint ts默认规则补充 pnpm i @typescript-eslint/eslint-plugin -D
5. eslint prettier插件安装 pnpm i eslint-plugin-prettier -D
6. 用来解决与eslint的冲突 pnpm i eslint-config-prettier -D 
7. 安装prettier pnpm i prettier -D
涉及文件：
.eslintrc、.eslintignore
.prettierrc、.prettierignore
重启vscode使配置生效
8. vscode 保存自动格式化

## husky、lint-staged、@commitlint/cli
husky：一个为git客户端增加hook的工具
lint-staged：仅对Git 代码暂存区文件进行处理，配合husky使用
@commitlint/cli：让commit信息规范化
1. 创建git仓库 git init
2. 安装
    pnpm i husky -D 
    pnpm i lint-staged -D
    pnpm i @commitlint/cli @commitlint/config-conventional -D
3. 运行
    生成 .husky 的文件夹: npx husky install
    添加 hooks，会在 .husky 目录下生成一个 pre-commit 脚本文件: npx husky add .husky/pre-commit "npx --no-install lint-staged"
    添加 commit-msg: npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
4. 修改package.json
    "lint-staged": {
        "src/**/*.{vue,js,jsx,ts,tsx,json}": [
        "pnpm run lint",
        "prettier --write"
        ]
    }
5. 新建commitlint.config.cjs
由于package.json的"type": "module"，需将commonjs文件显示声明为.cjs

## Git 项目代码提交格式：
git commit -m <type>[optional scope]: <description> //注意冒号后面有空格
- type：提交的类型（如新增、修改、更新等）
- optional scope：涉及的模块，可选
- description：任务描述
- git commit -m 'feat: 增加 xxx 功能'

type类型：
revert 	 回退某个commit提交 
feat	 新功能
fix	     修复 bug   
style	 样式修改（UI校验）
docs   	 文档更新 
refactor 重构代码(既没有新增功能，也没有修复 bug)
perf	 优化相关，比如提升性能、体验     
test 	 增加测试，包括单元测试、集成测试等
build  	 构建系统或外部依赖项的更改  
ci  	 自动化流程配置或脚本修改

## vscode 保存自动格式化
在.vscode下新建 settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
之后每次文件有修改，保存时，都会自动格式化

## 配置路由
1. 安装 pnpm i vue-router
2. 在 src/router 上，定义路由（eg: router/routes.ts）， 创建路由实例(router/index.ts), 路由注册(main.ts)，定义路由出口（App.vue）
3. 嵌套路由（eg: router/routes.ts）children
4. 配置404页面
5. 重定向
6. 路由传参 - query传参
    页面传参
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const handleManage = () => {
        router.push({
            path: '/home/manage',
            query: {
                plan: '123',
            },
        });
    };
    
    页面接参
    import { useRoute } from 'vue-router';
    const route = useRoute();
    console.log(route.query.plan); //query接参 

7. 路由传参 - 动态路由匹配
    定义路由
    {
        path: '/register/:plan', // 动态字段以冒号开始
        component: () => import('@/pages/register.vue'),
    },

    页面传参
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const handleManage = () => {
    router.push('/register/123');
    };

    页面接参
    import { useRoute } from 'vue-router';
    const route = useRoute();
    console.log(route.params.plan); //params接参

8. 路由传参 - 命名路由params传参（已被废弃）
9. 导航守卫
10. 路由元信息
11. 路由懒加载
12. 动态路由

### 导航守卫
1. 全局前置守卫 router.beforeEach
    使用场景：做登录判断，未登录用户跳转到登录页
    修改router/index.ts

2. 路由独享守卫
    使用场景：部分页面不需要登录，部分页面需要登录才能访问

3. 组件内守卫
    使用情景： 预防用户在还未保存修改前突然离开。该导航可以通过返回 false 来取消
    import { onBeforeRouteLeave } from 'vue-router';

    // 与 beforeRouteLeave 相同，无法访问 `this`
    onBeforeRouteLeave((to, from) => {
    const answer = window.confirm('确定离开吗');
    // 取消导航并停留在同一页面上
    if (!answer) return false;
    });
### 路由元信息
将自定义信息附加到路由上，例如页面标题，是否需要权限，是否开启页面缓存等

使用情景：使用路由元信息+全局前置守卫实现部分页面不需要登录，部分页面需要登录才能访问

### 路由懒加载
使用() => import()方式导入的组件，只会在第一次进入页面时才会加载对应路由的组件
webpack命名chunk，vite会自动根据组件文件名命名chunk
const UserDetails = () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')

### 动态路由
与动态路由匹配不同，动态路由是手动添加路由表中没有的路由，通常用在权限校验中，如果没有该权限，直接访问该路由失败