import { describe, expect, it } from "vitest";
import type { Project, Task } from "../types/models";
import { buildProjectWithTaskCount } from "./projectMetrics";

const project: Project = {
  _id: "project-1",
  organizationId: "org-1",
  name: "Website Redesign",
  description: "Refresh the public website.",
  createdBy: "user-1",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const createTask = (_id: string, projectId: string): Task => ({
  _id,
  organizationId: "org-1",
  projectId,
  title: "Build the homepage",
  description: "Create the responsive homepage layout.",
  status: "todo",
  priority: "medium",
  assignedTo: null,
  dueDate: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("buildProjectWithTaskCount", () => {
  it("returns a zero task count when the project has no tasks", () => {
    expect(buildProjectWithTaskCount(project, []).taskCount).toBe(0);
  });

  it("does not count tasks that belong to a different project", () => {
    const otherProjectTasks = [
      createTask("task-1", "project-2"),
      createTask("task-2", "project-2"),
    ];

    expect(
      buildProjectWithTaskCount(project, otherProjectTasks).taskCount,
    ).toBe(0);
  });

  it("counts tasks that belong to the project", () => {
    const tasks = [
      createTask("task-1", "project-1"),
      createTask("task-2", "project-1"),
    ];

    expect(buildProjectWithTaskCount(project, tasks).taskCount).toBe(2);
  });
});
