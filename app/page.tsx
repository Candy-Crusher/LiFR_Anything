"use client";

import { useState } from "react";

type Week = {
  id: string;
  index: string;
  dates: string;
  title: string;
  summary: string;
  state: "now" | "next" | "later" | "buffer";
  method: string[];
  experiment: string[];
  dataset: string[];
  writing: string[];
  gate: string;
};

const weeks: Week[] = [
  {
    id: "w1", index: "01", dates: "7.14 — 7.20", title: "定义问题，启动两条关键路径",
    summary: "方法设计空间收敛；新数据集完成 pilot；现有实验管线全部固化。", state: "now",
    method: ["复盘 conference 版本的 failure cases", "定义 newly-visible / disocclusion / source-free 区域", "调研 event–RGB fusion、feature completion 与 occlusion-aware warping", "提出 2–3 个候选：naive fusion、visibility gate、residual correction"],
    experiment: ["冻结 3 个任务的预处理、指标与 split", "归档现有模型在 5 个数据集上的结果", "搭建统一主表与运行日志模板"],
    dataset: ["确定相机、场景、标注形式与快速运动类别", "完成一次端到端 pilot：采集 → 同步 → 标定 → motion mask", "立即验证曝光、event noise 与 GT 可行性"],
    writing: ["完成 TPAMI outline", "起草 conference → journal 的差异说明"],
    gate: "交付：方法设计文档 v1、3 个候选结构、采集 protocol、baseline 表格与论文 outline。"
  },
  {
    id: "w2", index: "02", dates: "7.21 — 7.27", title: "快速原型，必须选定方法",
    summary: "在 EVIMO2 / DSEC 小配置上验证候选结构，同时开始正式采集。", state: "next",
    method: ["实现全部候选的最小可运行版本", "比较 event voxel / event feature / memory 输入", "比较 raw、gated 与 residual correction fusion", "聚焦 newly-visible region 的增益，而非只看全局均值"],
    experiment: ["启动 Depth 与 Multitask 的三数据集 baseline", "启动 EVIMO2 Motion Segmentation baseline", "记录速度、显存与参数量"],
    dataset: ["正式采集 3–5 个场景", "覆盖多速度、方向、入画、遮挡后重现", "每批数据当天检查同步和标注，避免整批返工"],
    writing: ["Introduction v1", "整理方法选择的动机与证据"],
    gate: "硬决策：7 月 27 日锁定主方法。复杂结构若无稳定优势，选择最简单、最可解释的版本。"
  },
  {
    id: "w3", index: "03", dates: "7.28 — 8.03", title: "主方法 v1，完成主体采集",
    summary: "打通最终模型的完整训练路径；数据采集达到 70–80%。", state: "later",
    method: ["完成 encoder、propagation、fusion/correction 与 decoder 接口", "实现 visibility / uncertainty estimation", "确定 task、temporal、visibility、completion losses"],
    experiment: ["完成 conference 模型主表", "在一个代表性任务上验证最终方法 v1", "锁定正式训练配置与随机种子"],
    dataset: ["完成 70–80% 原始序列", "确保 train / val / test 场景分离", "覆盖速度区间并保留 unseen object / scene 测试"],
    writing: ["Introduction 与 Problem Formulation", "Method outline、Figure 1 草图", "Dataset section 初稿"],
    gate: "交付：最终方法 v1、baseline 主表、主体数据、conference-vs-journal statement。"
  },
  {
    id: "w4", index: "04", dates: "8.04 — 8.10", title: "全面训练，冻结数据集 v1",
    summary: "主模型进入正式训练；数据清洗、标注和 split 必须在本周结束。", state: "later",
    method: ["冻结主版本，只允许修 bug 与明显设计问题", "启动 Depth、Multitask、Motion Segmentation 正式训练", "不再进行无边界结构探索"],
    experiment: ["建立 10 项 ablation 矩阵", "加入 newly-visible / disocclusion 专项指标", "比较 pure warp、pure event、naive、gated 与 full model"],
    dataset: ["完成剩余采集、同步、标定、清洗与标注", "冻结 v1 split 与统计信息", "制作代表性 qualitative examples"],
    writing: ["Method section v1", "Dataset 与 Experiments 初稿"],
    gate: "硬冻结：8 月 10 日后不再改数据 split；所有主实验必须稳定运行。"
  },
  {
    id: "w5", index: "05", dates: "8.11 — 8.17", title: "结果收敛，完成全文初稿",
    summary: "主结果表冻结；ablation 完成至少 70%；所有核心段落齐备。", state: "later",
    method: ["只处理小问题，不增加新模块", "确认 causal / anytime 设定与 conference 版本一致"],
    experiment: ["完成 3 任务 × 5 数据集主结果", "补 backbone、event window、frame gap、速度与照明实验", "完成 FPS、latency、params、FLOPs 与 memory"],
    dataset: ["完成统计、可视化与定性样例", "整理和 EVIMO2 的差异与互补性"],
    writing: ["Method、Experiments、Dataset、Ablation 全文", "Limitations、Conclusion 与主要 qualitative figures"],
    gate: "交付：主表基本冻结、ablation ≥ 70%、完整初稿与全部主要图。"
  },
  {
    id: "w6", index: "06", dates: "8.18 — 8.23", title: "审稿人视角补洞",
    summary: "围绕最可能的质疑补专项分析，不再扩展任务版图。", state: "later",
    method: ["验证增益不是来自参数量增加", "解释 depth / multitask 的有效机制", "检查低事件密度与静态区域稳定性"],
    experiment: ["补 speed / temporal-gap / event-density 分层结果", "补 occlusion 与 newly-visible 专项结果", "整理 failure cases 与 computational trade-off"],
    dataset: ["补齐定性分析", "确认许可、隐私与发布范围"],
    writing: ["内部审阅并完成论文 v2", "Supplementary 与 cover letter 初稿"],
    gate: "交付：全部核心表图、论文第二版、supplementary 初稿。"
  },
  {
    id: "w7", index: "07", dates: "8.24 — 8.27", title: "冻结与定稿",
    summary: "统一论证、图表、符号和引用，只允许低风险补充实验。", state: "later",
    method: ["冻结代码与 checkpoint", "核对最终复现实验配置"],
    experiment: ["停止大规模新实验", "只补不影响主结论的低风险结果"],
    dataset: ["冻结发布材料与样例", "完成数据卡和使用说明"],
    writing: ["统一全文逻辑与图表格式", "检查引用、符号、重合内容与会议版披露", "准备 source、supplementary 与 cover letter"],
    gate: "内部 deadline：8 月 27 日最终 PDF 完成。"
  },
  {
    id: "w8", index: "08", dates: "8.28 — 8.31", title: "投稿缓冲",
    summary: "只处理投稿系统、格式和材料完整性问题。", state: "buffer",
    method: ["不再改方法"], experiment: ["不再启动实验"], dataset: ["锁定最终数据说明"],
    writing: ["核对 manuscript、supplementary、source 与 figures", "填写作者、COI 与 conference disclosure", "完成上传并由全体作者做最终检查"],
    gate: "目标：8 月 30 日前完成提交，保留至少 24 小时缓冲。"
  }
];

const lanes = [
  { key: "method", label: "方法", code: "M" },
  { key: "experiment", label: "实验", code: "E" },
  { key: "dataset", label: "数据集", code: "D" },
  { key: "writing", label: "写作", code: "W" },
] as const;

export default function Home() {
  const [open, setOpen] = useState("w1");

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="LiFR Anything TPAMI Roadmap">
          <span className="brandMark">L</span><span>LiFR / TPAMI</span>
        </a>
        <nav><a href="#scope">范围</a><a href="#timeline">时间线</a><a href="#principles">原则</a></nav>
        <a className="paperLink" href="https://arxiv.org/abs/2603.21115" target="_blank" rel="noreferrer">Conference paper ↗</a>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span /> TPAMI EXTENSION ROADMAP · 2026</div>
        <h1>六周半，把“能跑通”<br />变成<strong>足够强的期刊工作。</strong></h1>
        <div className="heroBottom">
          <p>实验覆盖已经足够。接下来不再横向加任务，而是并行推进新方法与新数据集，用专项证据讲清楚 LiFR 在快速运动与新可见区域上的价值。</p>
          <div className="deadline"><span>目标投稿</span><b>08.31</b><small>内部定稿 08.27</small></div>
        </div>
        <div className="progress" aria-label="项目时间进度">
          <div className="progressLabels"><span>今天 · 07.14</span><span>方法锁定 · 07.27</span><span>数据冻结 · 08.10</span><span>提交 · 08.31</span></div>
          <div className="progressTrack"><i /><i /><i /><i /></div>
        </div>
      </section>

      <section className="scope" id="scope">
        <div className="sectionLabel">01 / SCOPE</div>
        <div className="scopeContent">
          <div><h2>3 个任务，5 个数据集。<br /><em>到此为止。</em></h2><p>把算力和注意力投向创新强度、关键区域指标与完整消融，而不是继续增加任务。</p></div>
          <div className="taskGrid">
            <article><span>01</span><h3>Depth</h3><p>DSEC<br />M3ED–Drone Dog<br />DSEC–Night</p></article>
            <article><span>02</span><h3>Multitask</h3><p>DSEC<br />M3ED–Drone Dog<br />DSEC–Night</p></article>
            <article><span>03</span><h3>Motion Seg.</h3><p>EVIMO2<br />Our New Dataset</p></article>
          </div>
        </div>
      </section>

      <section className="critical">
        <div className="criticalIntro"><span>CRITICAL PATHS</span><h2>两条路径，今天同时启动。</h2></div>
        <div className="path"><b>A</b><div><span>方法设计</span><i>→</i><span>专项验证</span><i>→</i><span>全任务训练</span></div><small>最高优先级</small></div>
        <div className="path"><b>B</b><div><span>采集设计</span><i>→</i><span>Pilot</span><i>→</i><span>采集 / 标注</span><i>→</i><span>冻结</span></div><small>最长周期</small></div>
      </section>

      <section className="timeline" id="timeline">
        <div className="timelineHead"><div className="sectionLabel">02 / WEEKLY PLAN</div><div><h2>每周只有一个<br />不可妥协的结果。</h2><p>点击任一周，展开四条工作线与交付门槛。</p></div></div>
        <div className="weekList">
          {weeks.map((week) => {
            const active = open === week.id;
            return <article className={`week ${active ? "open" : ""}`} key={week.id}>
              <button onClick={() => setOpen(active ? "" : week.id)} aria-expanded={active} aria-controls={`${week.id}-detail`}>
                <span className="weekIndex">{week.index}</span>
                <span className="weekDate">{week.dates}{week.state === "now" && <i>NOW</i>}{week.state === "buffer" && <i>BUFFER</i>}</span>
                <span className="weekTitle"><b>{week.title}</b><small>{week.summary}</small></span>
                <span className="toggle">{active ? "−" : "+"}</span>
              </button>
              <div className="weekDetail" id={`${week.id}-detail`}>
                <div className="lanes">{lanes.map((lane) => <div className="lane" key={lane.key}><div className="laneHead"><i>{lane.code}</i><b>{lane.label}</b></div><ul>{week[lane.key].map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
                <div className="gate"><span>本周门槛</span><p>{week.gate}</p></div>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="principles" id="principles">
        <div className="sectionLabel">03 / OPERATING RULES</div>
        <div className="rules"><h2>守住范围，<br />才能守住日期。</h2><ol><li><span>01</span><p><b>7 月 27 日必须选方法。</b>复杂结构没有稳定优势，就选最简单、最好解释的设计。</p></li><li><span>02</span><p><b>数据按批验收。</b>不要等全部拍完才检查同步、曝光、事件噪声与 motion mask。</p></li><li><span>03</span><p><b>8 月 10 日双冻结。</b>数据集与主方法同时冻结，之后只修 bug，不增加大模块。</p></li><li><span>04</span><p><b>把新区域单独量出来。</b>必须报告 newly-visible / disocclusion 指标，否则核心贡献不可见。</p></li></ol></div>
      </section>

      <footer><div><span className="brandMark">L</span><b>LiFR / TPAMI</b></div><p>From propagation to perception in motion.</p><span>Updated · 2026.07.14</span></footer>
    </main>
  );
}
