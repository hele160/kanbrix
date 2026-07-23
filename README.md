# Jira-Clone

> 一款基于 Next.js 14 的敏捷项目管理与看板协作平台，灵感来自 Jira。

Jira Clone 是一个功能完整的团队协作工具，支持工作区管理、项目跟踪、任务看板、日历视图和数据分析，帮助团队高效管理敏捷开发流程。

---

## 功能特性

### 🔐 认证系统
- 邮箱密码注册与登录
- 基于 Session 的登录态管理（httpOnly Cookie）
- 自动重定向与路由守卫

### 🏢 工作区（Workspaces）
- 创建工作区并上传封面图片
- 邀请码机制：生成 6 位随机邀请码，成员凭码加入
- 管理员权限控制：仅管理员可编辑/删除工作区
- 工作区切换器：顶部下拉快速切换

### 📁 项目（Projects）
- 工作区下创建多个项目
- 项目头像与名称管理
- 项目级数据分析仪表盘

### 📋 任务（Tasks）
- 完整 CRUD：创建、编辑、删除任务
- 任务属性：名称、状态、负责人、截止日期、项目、描述
- 五种任务状态：**Backlog → To Do → In Progress → In Review → Done**
- **三种视图模式**：
  - **表格视图（Table）** — 支持排序、分页、列过滤
  - **看板视图（Kanban）** — 支持拖拽更改任务状态与排序，位置值自动计算
  - **日历视图（Calendar）** — 按月展示任务截止日期
- 支持按状态、负责人、项目、截止日期筛选
- 支持关键词搜索

### 👥 成员管理
- 工作区成员列表
- 两种角色：**管理员（ADMIN）** 和 **普通成员（MEMBER）**
- 管理员可升级/降级成员角色
- 成员可自行退出工作区
- 防止删除唯一成员

### 📊 数据分析
- 工作区级/项目级统计分析
- 五个指标：总任务数、已分配任务数、已完成任务数、逾期任务数、未完成任务数
- 环比上月差值对比（增长/下降）

### 🎨 现代化 UI
- 基于 **shadcn/ui** + **Radix UI** 的无障碍组件
- 亮色/暗色主题切换（next-themes）
- 响应式布局（桌面侧边栏 + 移动端底部导航）
- 实时 Toast 通知（sonner）

---

## 技术栈

| 类别       | 技术选型                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| **框架**   | Next.js 14 (App Router) + TypeScript                                    |
| **样式**   | Tailwind CSS + 自定义 OKLCH 色彩体系 + tailwind-merge + clsx            |
| **UI 库**  | shadcn/ui、Radix UI、Lucide React、React Icons                          |
| **后端**   | Appwrite（认证 / 数据库 / 文件存储）                                     |
| **API**    | Hono（轻量级 Edge API，部署于 Vercel） + @hono/zod-validator             |
| **拖拽**   | @hello-pangea/dnd（原 react-beautiful-dnd 维护版）                       |
| **状态管理** | TanStack React Query v5                                                  |
| **表格**   | TanStack React Table v8（排序、分页、过滤）                               |
| **图表**   | Recharts                                                                 |
| **日历**   | React Big Calendar + date-fns                                            |
| **表单**   | react-hook-form + Zod                                                    |
| **路由状态** | nuqs（URL 查询参数状态同步）                                             |
| **包管理** | pnpm                                                                     |

---

## 快速开始

### 前置要求

- Node.js >= 18
- pnpm（推荐）或 npm、yarn
- Appwrite 自建实例或 [Appwrite Cloud](https://cloud.appwrite.io)

### 1. 克隆项目

```bash
git clone https://github.com/hele160/kanbrix.git
cd kanbrix
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
# Appwrite 配置
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your-project-id
NEXT_APPWRITE_KEY=your-api-key

# Appwrite 数据库与集合 ID
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=your-workspaces-collection-id
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=your-members-collection-id
NEXT_PUBLIC_APPWRITE_PROJECTS_ID=your-projects-collection-id
NEXT_PUBLIC_APPWRITE_TASKS_ID=your-tasks-collection-id
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=your-images-bucket-id

# 应用 URL（本地开发用）
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

---

## 项目结构

```
kanbrix/
├── public/                          # 静态资源
│   └── logo.svg                     # 项目Logo
├── src/
│   ├── app/                         # Next.js App Router 页面
│   │   ├── (auth)/                  # 登录/注册路由
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (dashboard)/             # 控制台路由
│   │   │   └── workspaces/
│   │   │       └── [workspaceId]/
│   │   ├── (standalone)/            # 独立页面（设置、成员等）
│   │   └── api/                     # Hono API 路由
│   │       └── [[...route]]/
│   ├── components/                  # 通用 UI 组件
│   │   ├── ui/                      # shadcn/ui 组件
│   │   ├── analytics.tsx            # 分析仪表盘
│   │   ├── navbar.tsx               # 顶部导航栏
│   │   ├── sidebar.tsx              # 侧边栏
│   │   └── workspace-switcher.tsx   # 工作区切换器
│   ├── features/                    # 功能模块
│   │   ├── auth/                    # 认证
│   │   │   ├── api/                 # 前端 API 请求
│   │   │   ├── components/          # UI 组件
│   │   │   └── server/              # 服务端路由
│   │   ├── workspaces/              # 工作区
│   │   ├── projects/                # 项目
│   │   ├── tasks/                   # 任务（核心模块）
│   │   │   ├── api/                 # 任务 API hooks
│   │   │   ├── components/          # 表格/看板/日历视图
│   │   │   ├── hooks/               # 自定义 hooks
│   │   │   └── server/              # 服务端路由
│   │   └── members/                 # 成员管理
│   ├── hooks/                       # 全局 hooks
│   ├── lib/                         # 工具库
│   │   ├── appwrite.ts              # Appwrite 客户端
│   │   ├── rpc.ts                   # Hono RPC 客户端
│   │   ├── session-middleware.ts    # Session 中间件
│   │   └── utils.ts                 # 通用工具函数
│   └── config.ts                    # 环境变量配置
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 核心业务流程

### 认证流程
```
用户 → 注册/登录 → Appwrite 创建 Session → Cookie 存储 → 后续请求验证 Session
```

### 工作区创建
```
用户 → POST /workspaces → 创建 Workspace 文档 → 创建者作为 ADMIN 加入 Members
```

### 成员加入
```
普通成员 → POST /workspaces/:id/join → 校验邀请码 → 以 MEMBER 角色加入 Members
```

### 任务看板拖拽
```
拖拽任务 → 计算新状态与 position（步长 1000）→ PATCH /tasks/bulk-update → 批量更新
```

---

## 开发指南

### 常用命令

| 命令               | 说明                   |
| ------------------ | ---------------------- |
| `pnpm dev`         | 启动开发服务器         |
| `pnpm build`       | 构建生产版本           |
| `pnpm start`       | 启动生产服务器         |
| `pnpm lint`        | 运行 ESLint 检查       |

### Appwrite 数据模型

#### Workspace
| 字段        | 类型   | 说明                 |
| ----------- | ------ | -------------------- |
| `name`      | string | 工作区名称           |
| `imageUrl`  | string | 工作区封面图         |
| `inviteCode`| string | 6 位随机邀请码       |
| `userId`    | string | 创建者用户 ID        |

#### Project
| 字段         | 类型   | 说明           |
| ------------ | ------ | -------------- |
| `name`       | string | 项目名称       |
| `imageUrl`   | string | 项目头像       |
| `workspaceId`| string | 所属工作区 ID  |

#### Task
| 字段         | 类型                | 说明               |
| ------------ | ------------------- | ------------------ |
| `name`       | string              | 任务名称           |
| `status`     | enum (BACKLOG/TODO/IN_PROGRESS/IN_REVIEW/DONE) | 任务状态 |
| `workspaceId`| string              | 所属工作区         |
| `projectId`  | string              | 所属项目           |
| `assigneeId` | string              | 负责人 Member ID   |
| `dueDate`    | string (ISO date)   | 截止日期           |
| `position`   | number              | 看板排序位置       |
| `description`| string (optional)   | 任务描述           |

#### Member
| 字段         | 类型                | 说明               |
| ------------ | ------------------- | ------------------ |
| `workspaceId`| string              | 所属工作区         |
| `userId`     | string              | 用户 ID            |
| `role`       | enum (ADMIN/MEMBER) | 角色               |

---

## 部署

推荐部署到 **Vercel**：

1. 将项目推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量（同上 `.env.local` 中的所有变量）
4. 部署即可

> 注意：Hono API 路由通过 `hono/vercel` 适配器运行在 Vercel Edge Functions 上，无需额外配置。

---

## 许可证

MIT © [hele160](https://github.com/hele160/jira-clone)