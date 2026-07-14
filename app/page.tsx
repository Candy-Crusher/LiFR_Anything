const schedule = [
  ["7/14–7/20", "方法调研与数据采集准备", "确定 2–3 个方法方案；完成数据集 pilot；固化实验 pipeline。"],
  ["7/21–7/27", "快速验证并确定方法", "在 EVIMO2 / DSEC 做小规模验证；正式开始采集；7/27 锁定方法。"],
  ["7/28–8/3", "完成最终方法 v1", "打通完整模型；完成原方法主表；新数据采集达到 70%–80%。"],
  ["8/4–8/10", "完整训练与数据集冻结", "三任务全面训练；完成标注与清洗；8/10 冻结数据集 v1。"],
  ["8/11–8/17", "结果收敛", "完成主结果和 70% 以上消融；完成论文初稿。"],
  ["8/18–8/23", "补实验与内部审阅", "补 newly-visible、速度、时间间隔、事件密度和效率分析。"],
  ["8/24–8/27", "论文定稿", "冻结代码和实验；统一图表、引用、符号及会议版差异说明。"],
  ["8/28–8/31", "投稿缓冲", "检查 manuscript、supplementary、cover letter 和投稿系统。"],
];

export default function Home() {
  return (
    <main>
      <header>
        <p className="label">LiFR Anything · TPAMI Extension</p>
        <h1>TPAMI 投稿计划</h1>
        <p className="lead">目标：2026 年 8 月底投稿。内部定稿日期：8 月 27 日。</p>
        <a href="https://arxiv.org/abs/2603.21115" target="_blank" rel="noreferrer">会议版本 ↗</a>
      </header>

      <section>
        <h2>工作范围</h2>
        <p>现有实验覆盖已经足够，不再增加新任务。后续重点是新方法、专项验证和新数据集。</p>
        <div className="columns">
          <div><h3>Depth</h3><p>DSEC<br />M3ED–Drone Dog<br />DSEC–Night</p></div>
          <div><h3>Multitask</h3><p>DSEC<br />M3ED–Drone Dog<br />DSEC–Night</p></div>
          <div><h3>Motion Segmentation</h3><p>EVIMO2<br />Our New Dataset</p></div>
        </div>
      </section>

      <section>
        <h2>当前优先级</h2>
        <ol className="priority">
          <li><b>新方法设计：</b>本周完成调研并提出 2–3 个候选结构，7 月 27 日前确定最终路线。</li>
          <li><b>新数据集：</b>立即完成 pilot，验证同步、标定和 motion mask，再开始正式采集。</li>
          <li><b>现有实验：</b>固化 3 个任务、5 个数据集的 pipeline、指标和 baseline。</li>
        </ol>
      </section>

      <section>
        <h2>每周安排</h2>
        <div className="schedule">
          {schedule.map(([date, title, detail]) => (
            <article key={date}>
              <time>{date}</time>
              <div><h3>{title}</h3><p>{detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>关键截止日期</h2>
        <ul>
          <li><b>7 月 27 日：</b>确定最终方法。</li>
          <li><b>8 月 10 日：</b>冻结方法主版本和新数据集 v1。</li>
          <li><b>8 月 17 日：</b>完成主结果和论文完整初稿。</li>
          <li><b>8 月 23 日：</b>完成核心补充实验和第二版论文。</li>
          <li><b>8 月 27 日：</b>内部定稿。</li>
          <li><b>8 月 31 日：</b>投稿截止目标。</li>
        </ul>
      </section>

      <footer>Last updated · 2026-07-14</footer>
    </main>
  );
}
