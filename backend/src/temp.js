



export async function searchProject(req) {
	try {
	  const { userId, projectId } = req.params; // Get projectId from URL params
  
	  const user = await User.findById(userId);
	  
	  if (!user) {
		return res.status(404).json({ success: false, message: "User not found." });
	  }
  
	  const project = user.projects.find(p => p.id === projectId);
  
	  if (!project) {
		return res.status(404).json({ success: false, message: "Project not found." });
	  }
  
	  return res.status(200).json({
		success: true,
		project,
	  });
  
	} catch (error) {
	  console.error("Error in searchProject controller:", error);
	  return res.status(500).json({ success: false, message: "Internal server error." });
	}
  }
  