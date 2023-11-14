// Defining for each module, action by action, levels required to do x.

export type ModuleNameType = "subscriptions" | "payments" | "agreements" | "procurement_plan";

export type ActionNameType = "subscriptions" | "payments" | "agreements" | "procurement_plan";

export const config : {
  [module: string]: {
    [action: string]: {
      [level: string]: {
        can: boolean, 
        status?: { [key: string]: boolean }
      }
    }
  }} = {
  subscriptions: {
    view: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    },
    verify: {
      L1: { can: true, status: { SUBMITTED: true} },
      L2: { can: false },
      L3: { can: true, status: { SUBMITTED: true} },
      L4: { can: true, status: { SUBMITTED: true} },
    },
    sendBack: {
      L1: { can: true, status: { SUBMITTED: true} },
      L2: { can: true, status: { VERIFIED: true} },
      L3: { can: true, status: { SUBMITTED: true, VERIFIED: true } },
      L4: { can: true, status: { SUBMITTED: true, VERIFIED: true } },
    },
    reject: {
      L1: { can: false },
      L2: { can: true, status: { VERIFIED: true} },
      L3: { can: true, status: { VERIFIED: true} },
      L4: { can: true, status: { VERIFIED: true} },
    },
    validate: {
      L1: { can: false },
      L2: { can: true, status: { VERIFIED: true } },
      L3: { can: true, status: { VERIFIED: true } },
      L4: { can: true, status: { VERIFIED: true } },
    },
    download: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    },
    visualize: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    }
  },
  payments: {
    view: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    },
    verify: {
      L1: { can: true, status: { SUBMITTED: true} },
      L2: { can: false },
      L3: { can: true, status: { SUBMITTED: true} },
      L4: { can: true, status: { SUBMITTED: true} },
    },
    sendBack: {
      L1: { can: true, status: { SUBMITTED: true} },
      L2: { can: true, status: { VERIFIED: true} },
      L3: { can: true, status: { SUBMITTED: true, VERIFIED: true } },
      L4: { can: true, status: { SUBMITTED: true, VERIFIED: true } },
    },
    reject: {
      L1: { can: false },
      L2: { can: true, status: { VERIFIED: true} },
      L3: { can: true, status: { VERIFIED: true} },
      L4: { can: true, status: { VERIFIED: true} },
    },
    validate: {
      L1: { can: false },
      L2: { can: true, status: { VERIFIED: true } },
      L3: { can: true, status: { VERIFIED: true } },
      L4: { can: true, status: { VERIFIED: true } },
    },
    download: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    },
    visualize: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    }
  },
  agreements: {
    view: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    },
    verify: {
      L1: { can: true, status: { SUBMITTED: true} },
      L2: { can: false },
      L3: { can: true, status: { SUBMITTED: true} },
      L4: { can: true, status: { SUBMITTED: true} },
    },
    sendBack: {
      L1: { can: true, status: { SUBMITTED: true} },
      L2: { can: true, status: { VERIFIED: true} },
      L3: { can: true, status: { SUBMITTED: true, VERIFIED: true } },
      L4: { can: true, status: { SUBMITTED: true, VERIFIED: true } },
    },
    reject: {
      L1: { can: false },
      L2: { can: true, status: { VERIFIED: true} },
      L3: { can: true, status: { VERIFIED: true} },
      L4: { can: true, status: { VERIFIED: true} },
    },
    validate: {
      L1: { can: false },
      L2: { can: true, status: { VERIFIED: true } },
      L3: { can: true, status: { VERIFIED: true } },
      L4: { can: true, status: { VERIFIED: true } },
    },
    download: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    },
    visualize: {
      L1: { can: true },
      L2: { can: true },
      L3: { can: true },
      L4: { can: true },
    }
  },
};


export function searchAbility(user: any, moduleName: string | ModuleNameType, actionName: string | ActionNameType, item: any = null) : boolean {
  const module = config[moduleName];
  if (!module) return false

  const action = module[actionName];
  if (!action) return false;

  const userLevel = user.roles[moduleName]
  const level = action[userLevel];
  if (!userLevel || !level) return false;

  const isInCorrectStatut = level.status ? level.status[item?.status]: true;
  const canPerformAction = level.can;

  return canPerformAction && isInCorrectStatut;
}