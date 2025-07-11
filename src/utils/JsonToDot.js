export function jsonToDot(data) {
  const meters = data.Meters || [];
  const chargers = data.Chargers || [];
  const sites = data.Sites || [];
  const connectors = data.Connectors || [];

  const siteName = sites.length > 0 ? sites[0].name : "Unnamed Site";
  const wifiIcon = "📶";
  let dot = `digraph G {
  // Vertical ports: top (L1-L3) and bottom (L1-L3)
  graph [
    splines=true,
    overlap=false,
    pad="1",
    sep="+1",
    bgcolor=white,
    rankdir=TB,
    nodesep=1.0,
    ranksep=1.0
  ];

  node [
    shape=plaintext, 
    style="rounded",
    fontname="Helvetica",
    fontsize=12,
    margin=0.1,
    penwidth=2
  ];

  edge [
    arrowhead=none,
    arrowtail= none,
    dir=both,
    color="#555555",
    penwidth=1.5,
    minlen=2
  ];

  // Site label
  site [shape=plaintext, label=<<B>🏢 ${siteName}</B>>];
`;

  // Render meters with top and bottom ports
  meters.forEach(m => {
    const id = ``;
    const status = m.meter_status === "OFFLINE" ? "Offline" : "Online";
    dot += ` "meter_${m.meter_id}" [label=<
    <TABLE BORDER="1" STYLE= "ROUNDED" CELLPADDING= "10" CELLBORDER="1" CELLSPACING="10" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE">
      <TR>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="top_l1">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L1</TD>
						</TR>
          </TABLE>
        </TD>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="top_l2">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L2</TD>
						</TR>
          </TABLE>
        </TD>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="top_l3">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L3</TD>
						</TR>
          </TABLE></TD>
      </TR>
      <TR>
        <TD BORDER="0" COLSPAN="3"><B>${wifiIcon} ${status} ${m.meter_id}</B></TD>
      </TR>
      <TR>
        <TD BORDER="0" COLSPAN="3"><B> ${m.max_capacity }VWh</B></TD>
      </TR>
      <TR>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="bot_l1">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L1</TD>
						</TR>
          </TABLE>
        </TD>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="bot_l2"><TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L2</TD>
						</TR>
          </TABLE></TD>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="bot_l3">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L3</TD>
						</TR>
          </TABLE></TD>
      </TR>
    </TABLE>
  >];
`;
  });

  // Render chargers with top and bottom ports
  chargers.forEach(ch => {
    const id = `"charger_${ch.chargerId}"`;
    const status = ch.isConnected ? 'Connected' : 'Disconnected';
    const phases = ch.phaseAssignment.split('_').map(p => p.toLowerCase());
    dot += `  ${id} [label=<
    <TABLE BORDER="1" STYLE= "ROUNDED" CELLPADDING= "10" CELLBORDER="1" CELLSPACING="10">
      <TR>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="top_l1">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L1</TD>
						</TR>
          </TABLE>
          </TD>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="top_l2">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L2</TD>
						</TR>
          </TABLE>
          </TD>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="top_l3">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L3</TD>
						</TR>
          </TABLE>
          </TD>
      </TR>
      <TR>
        <TD BORDER="0" COLSPAN="3"><B>${wifiIcon} ${status} ${ch.chargerId}</B></TD>
      </TR>
      <TR>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE" PORT="bot_AC">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L1</TD>
						</TR>
          </TABLE></TD>
        <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE"  PORT="bot_DC">
        <TABLE CELLPADDING="0" BORDER="1" STYLE="ROUNDED" CELLSPACING="1">
						<TR>
							<TD BORDER="0">L2</TD>
						</TR>
          </TABLE></TD>
      </TR>
    </TABLE>
  >, fillcolor="#FFE0B2"];
`;
  });


//    dot += ` Connector[label=<
//     <TABLE BORDER="0" STYLE= "ROUNDED" CELLPADDING= "10" CELLBORDER="1" CELLSPACING="0">
//       <TR>
//         <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE">AC</TD>
//         <TD STYLE="ROUNDED" HEIGHT="0" WIDTH="0" FIXEDSIZE="TRUE">DC</TD>
//       </TR>
//     </TABLE>
//   >, fillcolor="#FFE0B2"];
// `;






//   // Connect parent meters (bottom to top)
//   meters.forEach(m => {
//     if (m.parent_id) {
//       const parent = meters.find(x => x.id === m.parent_id);
//       if (parent) {
//         dot += `  "meter_${parent.meter_id}":bot_l1 -> "meter_${m.meter_id}"
// `;
//       }
//     }
//   });

//   // Connect chargers to meters (bottom to top)
//   chargers.forEach(ch => {
//     const parent = meters.find(m => m.id === ch.meterId);
//     if (parent) {
//       ch.phaseAssignment.split('_').forEach(ph => {
//         const port = ph.toLowerCase();
//         dot += `  "meter_${parent.meter_id}":bot_${port} -> "charger_${ch.chargerId}":top_${port};
// `;
//       });
//     }
//   });

  // meters.forEach(m => {
  //   if (m.parent_id) {
  //     const parent = meters.find(x => x.id === m.parent_id);
  //     if (parent) {
  //       dot += `  "meter_${parent.meter_id}":bot_l1 -> "meter_${m.meter_id}":top_l1 [dir=both arrowtail=diamond];
  //     `;
  //     }
  //   }
  // });

  meters.forEach(m => {
  if (m.parent_id) {
    const parent = meters.find(x => x.id === m.parent_id);
    if (parent) {
      dot += `"meter_${parent.meter_id}":bot_l1 -> "meter_${m.meter_id}":top_l1 ;`;
    }
  }
});


  chargers.forEach(ch => {
    const parent = meters.find(m => m.id === ch.meterId);
    if (parent) {
     if (ch.phaseAssignment) {
      const phases = ch.phaseAssignment.split('_').map(p => p.toLowerCase());
      phases.forEach((ph, i) => {
        const top = `top_l${i+1}`;
        dot += `  "meter_${parent.meter_id}":bot_${ph} -> "charger_${ch.chargerId}":${top};\n`;
      });
    }

     
//       ch.phaseAssignment.split('_').forEach(ph => {
//         const port = ph.toLowerCase();
//         dot += `  "meter_${parent.meter_id}":bot_${port} -> "charger_${ch.chargerId}":top_${port};
// `;
//       });
    }
  });



   connectors.forEach(conn => {
    const id = `"connector_${conn.id}"`;
    const type = conn.currentType || 'Unknown'; 
    const minKwh = conn.minKwh || 0;
    const maxKwh = conn.maxKwh || 0;
    const fill = conn.isActive ? '#C8E6C9' : '#EEEEEE';
    dot += `  ${id} [label=<
      <TABLE BORDER="0" STYLE="ROUNDED" CELLPADDING="8" CELLBORDER="1">
        <TR><TD><B>${type}  #${conn.id}</B></TD></TR>
        <TR><TD>${minKwh} - ${maxKwh} Kwh</TD></TR>
      </TABLE>
    >, style="filled", fillcolor="${fill}"];\n`;

    const parent = chargers.find(ch => ch.id === conn.chargerId);
    if (parent) {
      const port = type.toLowerCase();
      dot += `  "charger_${parent.chargerId}":bot_${port} -> connector_${conn.id};\n`;
    }
  });

  dot += `}`;
  // console.log(dot)
  return dot;
}
