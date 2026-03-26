
"""
Redirect backend.core.terminal to backend.api.v1.terminal
for backward compatibility, pending full refactor.
"""
import sys
from backend.api.v1.terminal import (
    router,
    create_session,
    execute_command,
    get_session, 
    list_sessions,
    delete_session,
    send_message,
    add_exploitation_step,
    get_exploitation_path,
    get_vpn_status,
    list_templates,
    CreateSessionRequest,
    ExecuteCommandRequest,
    MessageRequest,
    ExploitationStepRequest
)

# Re-export key components
__all__ = [
    "router",
    "create_session",
    "execute_command",
    "get_session",
    "list_sessions",
    "delete_session",
    "send_message",
    "add_exploitation_step",
    "get_exploitation_path",
    "get_vpn_status",
    "list_templates",
    "CreateSessionRequest",
    "ExecuteCommandRequest",
    "MessageRequest",
    "ExploitationStepRequest"
]
