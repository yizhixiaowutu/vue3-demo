export const sop1 = [
  {
    sopNodeCode: "SOPNODE20230920KTAIIEOC",
    processCode: "HJ20230920XGRXQSVI",
    processType: 0,
    processName: "立单环节",
    nextNodeList: ["SOPNODE202309204SWSDC2G"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20230920KTAIIEOC",
        triggerCode: "TRIGGER20230920HQBLOLHJ",
        triggerName: "跳转立单采集环节",
        nextNodeList: ["SOPNODE202309204SWSDC2G"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE202309204SWSDC2G",
    processCode: "HJ20230920NOCWZNDP",
    processType: 1,
    processName: "业主生活费用自助立单环节",
    nextNodeList: ["SOPNODE20230920KRE0X36L"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE202309204SWSDC2G",
        triggerCode: "TRIGGER20230920BKYZRRHO",
        triggerName: "提交流转云管家",
        nextNodeList: ["SOPNODE20230920KRE0X36L"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20230920KRE0X36L",
    processCode: "HJ20230920V8WRS0VS",
    processType: 10,
    processName: "APP业主生活费用云管家处理环节",
    nextNodeList: ["SOPNODE20230920TMFYJC6A"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20230920KRE0X36L",
        triggerCode: "TRIGGER20230920IRGWGELB",
        triggerName: "流转评价",
        nextNodeList: ["SOPNODE20230920TMFYJC6A"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20230920QCVLT1SV",
    processCode: "HJ202309207HTYSQMX",
    processType: 10,
    processName: "低评/未解决闭环处理环节",
    nextNodeList: ["SOPNODE20230920MSMXCPSI"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20230920QCVLT1SV",
        triggerCode: "TRIGGER20230920PYFYHPWL",
        triggerName: "客户认可/低评/三次联系不上",
        nextNodeList: ["SOPNODE20230920MSMXCPSI"],
      },
      {
        sopNodeCode: "SOPNODE20230920QCVLT1SV",
        triggerCode: "TRIGGER20230920KYGLZYDK",
        triggerName: "升级二级单",
        nextNodeList: null,
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20230920TMFYJC6A",
    processCode: "HJ20230920L70M30UE",
    processType: 10,
    processName: "客户评价环节",
    nextNodeList: ["SOPNODE20230920MSMXCPSI", "SOPNODE20230920QCVLT1SV"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20230920TMFYJC6A",
        triggerCode: "TRIGGER202309204ISVMYHP",
        triggerName: "高评结束",
        nextNodeList: ["SOPNODE20230920MSMXCPSI"],
      },
      {
        sopNodeCode: "SOPNODE20230920TMFYJC6A",
        triggerCode: "TRIGGER20230920GHS0X7IX",
        triggerName: "超时关闭",
        nextNodeList: ["SOPNODE20230920MSMXCPSI"],
      },
      {
        sopNodeCode: "SOPNODE20230920TMFYJC6A",
        triggerCode: "TRIGGER20230920RZMDEZO4",
        triggerName: "低评/未解决流转办结人上级",
        nextNodeList: ["SOPNODE20230920QCVLT1SV"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20230920MSMXCPSI",
    processCode: "HJ20230920SJD1SWZ0",
    processType: 99,
    processName: "结束环节",
    nextNodeList: null,
    triggerList: [
      {
        sopNodeCode: "SOPNODE20230920MSMXCPSI",
        triggerCode: "TRIGGER202309202XKT43GP",
        triggerName: "关单",
        nextNodeList: null,
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20230920BFUSK6KK",
    processCode: "HJ20230920MTSPOJPX",
    processType: 999,
    processName: "全局环节",
    nextNodeList: null,
    triggerList: null,
  },
];

export const sop2 = [
  {
    sopNodeCode: "SOPNODE20231019LHCBD7P8",
    processCode: "8a769500727d1cae01727d1caf270001",
    processType: 0,
    processName: "立单环节",
    nextNodeList: ["SOPNODE20231019TJUXRFYN"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20231019LHCBD7P8",
        triggerCode: "TRIGGER20231019QK0AGEAF",
        triggerName: "跳转立单采集环节",
        nextNodeList: ["SOPNODE20231019TJUXRFYN"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20231019JBTT9U2I",
    processCode: "8a769500727d1cae01727d1d617f0007",
    processType: 99,
    processName: "结束环节",
    nextNodeList: null,
    triggerList: [
      {
        sopNodeCode: "SOPNODE20231019JBTT9U2I",
        triggerCode: "TRIGGER202310190GNHGKN2",
        triggerName: "关单",
        nextNodeList: null,
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20231019SGJUI0AJ",
    processCode: "8a769500727d1cae01727d1da238000d",
    processType: 999,
    processName: "全局环节",
    nextNodeList: null,
    triggerList: null,
  },
  {
    sopNodeCode: "SOPNODE20231019TJUXRFYN",
    processCode: "HJ202310191W2JYS0I",
    processType: 1,
    processName: "立单采集",
    nextNodeList: ["SOPNODE202310193QGYKQBY"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20231019TJUXRFYN",
        triggerCode: "TRIGGER20231019MEOSGF2Y",
        triggerName: "111",
        nextNodeList: ["SOPNODE202310193QGYKQBY"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE202310193QGYKQBY",
    processCode: "HJ20231019JXNJHGVO",
    processType: 10,
    processName: "自定义1",
    nextNodeList: ["SOPNODE20231019JBTT9U2I"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE202310193QGYKQBY",
        triggerCode: "TRIGGER202310197ARNBAUY",
        triggerName: "999",
        nextNodeList: ["SOPNODE20231019JBTT9U2I"],
      },
    ],
  },
];
