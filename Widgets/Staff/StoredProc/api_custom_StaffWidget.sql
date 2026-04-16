SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[api_custom_StaffWidget]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[api_custom_StaffWidget] AS' 
END
GO



-- =============================================
-- api_custom_StaffWidget
-- =============================================
-- Description:		This stored procedure returns Staff Members
-- Last Modified:	4/17/2024
-- Chris Kehayias
-- Updates:
-- 4/17/2024		- Initial Commit
-- T.Vincent 3/29/2025 Customize for BHBC
-- =============================================
ALTER PROCEDURE [dbo].[api_custom_StaffWidget] 
	@DomainID int = 1,
	@UserName nvarchar(75) = null
AS
BEGIN


	SELECT 
		S.Name_to_Display
		,CASE WHEN S.Show_Email = 1 THEN C.Email_Address ELSE '' END AS Email_Address
		,C.Mobile_Phone
		,C.Contact_GUID
		,S.Facebook_URL
		,S.x_URL
		,S.Job_Title AS Title
		,Image_GUID = SF.Unique_Name
		,File_URL = CONCAT('https://', D.External_Server_Name, '/ministryplatformapi/files/')
		,S.Bio
		,S.Staff_Member_ID AS Staff_ID
		,S.Show_In_Pastoral_Leadership
	FROM Staff_Members S
	INNER JOIN Contacts C ON C.Contact_ID = S.Contact_ID
	INNER JOIN dp_Domains D ON D.Domain_ID = @DomainID
	--LEFT OUTER JOIN dp_Files CF ON CF.Table_Name='Contacts' AND CF.Record_ID=C.Contact_ID AND CF.Default_Image = 1
	INNER JOIN dp_Files SF ON SF.Table_Name='Staff_Members' AND SF.Record_ID=S.Staff_Member_ID AND SF.Default_Image = 1
	WHERE S.Hire_Date < GETDATE()
	AND (S.Termination_Date IS NULL OR S.Termination_Date > GETDATE())
	AND S.Show_Online = 1
	ORDER BY S.Online_Order


END


