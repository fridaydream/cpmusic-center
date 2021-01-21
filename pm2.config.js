// 名称任意，按照个人习惯来
module.exports = {
  apps: [
    {
      name: 'cpmusic-center', // 应用名称
      script: './server/index.js', // 启动文件地址
      cwd: './', // 当前工作路径
      // node_args: '--harmony', // node的启动模式
      out_file: './logs/out.log', // 普通日志路径
      error_file: './logs/err.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
