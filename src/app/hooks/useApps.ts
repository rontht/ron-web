"use client";

import { useState, useRef } from "react";
import { AppInfo } from "../data/apps";

export function useApps(initialApps: AppInfo[]) {
  const [apps, setApps] = useState<AppInfo[]>(initialApps);
  const orderCounter = useRef(0);

  const openApp = (app: AppInfo) => {
    setApps((prev) => {
      let assigned = false;

      const updated = prev.map((a) => {
        if (a.id === app.id) {
          if (a.order === undefined) {
            assigned = true;
            return { ...a, status: "focused" as AppInfo["status"], order: orderCounter.current };
          }
          return { ...a, status: "focused" as AppInfo["status"] };
        }

        return a.status === "focused" as AppInfo["status"]
          ? { ...a, status: "running" as AppInfo["status"] }
          : a;
      });

      if (assigned) {
        orderCounter.current += 1;
        console.log("Assigned order to", app.id, ":", orderCounter.current - 1);
      }

      return updated;
    });
  };

  const closeApp = (app: AppInfo) => {
    setApps((prev) => {
      const closedOrder = app.order;

      let updated = prev.map((a) => {
        if (a.id === app.id) {
          return {
            ...a,
            status: "off" as AppInfo["status"],
            order: undefined,
          };
        }
        return a;
      });

      if (typeof closedOrder === "number") {
        updated = updated.map((a) =>
          typeof a.order === "number" && a.order > closedOrder
            ? { ...a, order: a.order - 1 }
            : a
        );
        orderCounter.current = Math.max(orderCounter.current - 1, 0);
      }

      return updated;
    });
  };

  const minimizeApp = (app: AppInfo) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === app.id ? { ...a, status: "minimized" as AppInfo["status"] } : a
      )
    );
  };

  const focusApp = (app: AppInfo) => {
    console.log("Focusing app:", app.id, "Current status:", app.status);
    setApps((prev) => {
      let assigned = false;

      const updated = prev.map((a) => {
        if (a.id !== app.id) {
          return a.status === "focused"
            ? { ...a, status: "running" as AppInfo["status"] }
            : a;
        }

        if (a.status === "focused") {
          return { ...a, status: "minimized" as AppInfo["status"] };
        }

        if (a.order === undefined) {
          console.log("Assigning order", orderCounter.current, "to app", a.id);
          assigned = true;
          return {
            ...a,
            status: "focused" as AppInfo["status"],
            order: orderCounter.current,
          };
        }

        return {
          ...a,
          status: "focused" as AppInfo["status"],
        };
      });

      if (assigned) {
        orderCounter.current += 1;
        console.log("Incremented orderCounter to", orderCounter.current);
      }

      return updated;
    });
  };

  const updatePosition = (id: string, pos: { x: number; y: number }) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, position: pos } : a))
    );
  };

  return {
    apps,
    openApp,
    closeApp,
    minimizeApp,
    focusApp,
    updatePosition,
  };
}
