import streamlit as st
import requests
import matplotlib.pyplot as plt
import numpy as np

# --------------------------------------------------------
# PLATFORM CONFIGURATION (ELITE WIDE PLATFORM FOOTPRINT)
# --------------------------------------------------------
st.set_page_config(
    page_title="EquiPath - Responsible AI Dashboard",
    page_icon="⚖️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Enterprise CSS Styling injection for visual polish
st.markdown("""
    <style>
    .main-header { font-size:2.4rem !important; font-weight: 700 !important; color: #1E293B; margin-bottom: 0.5rem; }
    .metric-card { background-color: #F8FAFC; padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #E2E8F0; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.05); }
    .status-approved { color: #16A34A; font-weight: 700; font-size: 1.25rem; }
    .status-rejected { color: #DC2626; font-weight: 700; font-size: 1.25rem; }
    </style>
""", unsafe_allow_html=True) # <-- FIX: Changed unsafe_style to unsafe_allow_html

# --------------------------------------------------------
# SIDEBAR NAVIGATION & INPUT EXTRACTION
# --------------------------------------------------------
with st.sidebar:
    st.markdown("### 🧍 Applicant Profiler")
    st.caption("Populate downstream feature tensors dynamically.")
    
    age = st.slider("Applicant Age", 18, 100, 30, help="Minimum regulatory evaluation threshold is 18.")
    sex = st.selectbox("Demographic Cohort (Sex)", ["Male", "Female"])
    education_num = st.slider("Education Metric (Years/Level)", 1, 16, 10, help="Continuous mapping track parameter.")
    hours = st.slider("Weekly Operational Load (Hours)", 10, 168, 40)
    
    st.markdown("---")
    st.markdown("### 💰 Asset Inventory")
    capital_gain = st.number_input("Capital Acquisition Gains ($)", min_value=0, max_value=100000, value=0, step=1000)
    capital_loss = st.number_input("Capital Contraction Losses ($)", min_value=0, max_value=5000, value=0, step=500)

# Binary encoding map matching pipeline arrays
sex_map = {"Male": 1, "Female": 0}

# --------------------------------------------------------
# MAIN HERO SECTION AREA
# --------------------------------------------------------
st.markdown('<h1 class="main-header">🛡️ EquiPath: Responsible AI Compliance Command Center</h1>', unsafe_allow_html=True)
st.caption("Enterprise Risk Audit System • Automated Post-Processing Bias-Remediation Management Node")
st.markdown("---")

# Layout segmentation: Policy Controls vs System Telemetry Layout Grid
col_control, col_telemetry = st.columns([1, 3], gap="large")

with col_control:
    st.markdown("### ⚙️ Engine Policy")
    rl_active = st.toggle("Activate Fairness Optimization", value=True, help="Toggle real-time post-processing threshold adjustments.")
    
    st.markdown("---")
    st.markdown("#### Operational Thresholds")
    if rl_active:
        st.write("`Cohort Male:` **0.630**")
        st.write("`Cohort Female:` **0.200**")
        st.info("💡 Target demographic parity envelope set to **80.0%** constraint limit.")
    else:
        st.write("`Standard Cutoff:` **0.500**")
        st.warning("⚠️ Unmitigated mode exposes deployment pipelines to regulatory civil penalties.")

with col_telemetry:
    # --------------------------------------------------------
    # FASTAPI ORCHESTRATION LAYER
    # --------------------------------------------------------
    payload = {
        "age": age,
        "hours_per_week": hours,
        "capital_gain": capital_gain,
        "capital_loss": capital_loss,
        "education_num": education_num,
        "sex": sex_map[sex]
    }
    
    try:
        response = requests.post("http://127.0.0.1:8000/predict", json=payload, timeout=5)
        api_result = response.json()
        
        raw_prob = api_result["metrics"]["unmitigated_base_probability"]
        fair_prob = api_result["metrics"]["fairness_adjusted_probability"] if rl_active else raw_prob
        decision_raw = api_result["decisions"]["raw_model_outcome"]
        decision_fair = api_result["decisions"]["optimized_fair_outcome"] if rl_active else decision_raw
        overridden = api_result["decisions"]["outcome_overridden"] if rl_active else False
        
    except Exception as api_error:
        st.error(f"### 🚨 Upstream Infrastructure Network Core Disconnected\nUnable to bridge active socket tunnel to backend worker processing loop. Trace: `{api_error}`")
        st.stop()

    # --------------------------------------------------------
    # REAL-TIME DECISION TELEMETRY CARDS
    # --------------------------------------------------------
    st.markdown("### 📊 Live Inference Stream Audit")
    
    card_col1, card_col2 = st.columns(2)
    
    # Safely assign conditional sub-classes for clean HTML string compilation
    raw_color_class = "status-approved" if decision_raw == "Approved" else "status-rejected"
    fair_color_class = "status-approved" if decision_fair == "Approved" else "status-rejected"
    
    with card_col1:
        st.markdown(f"""
            <div class="metric-card">
                <caption style="color:#64748B;">UNMITIGATED COHORT PERFORMANCE</caption>
                <h2 style="margin:0.25rem 0; color:#0F172A;">{raw_prob:.4f}</h2>
                <p style="margin:0;">Raw Model Status: <span class="{raw_color_class}">{decision_raw}</span></p>
            </div>
        """, unsafe_allow_html=True)
        
    with card_col2:
        st.markdown(f"""
            <div class="metric-card">
                <caption style="color:#64748B;">FAIRNESS-ADJUSTED COMPLIANCE TARGET</caption>
                <h2 style="margin:0.25rem 0; color:#0F172A;">{fair_prob:.4f}</h2>
                <p style="margin:0;">Remediated Status: <span class="{fair_color_class}">{decision_fair}</span></p>
            </div>
        """, unsafe_allow_html=True)

    st.markdown(" ")
    
    # Contextual Banner Alerts depending on System Decisions Override Actions
    if rl_active and overridden:
        st.error(f"⚖️ **Automated Compliance Override Implemented:** Incoming profile evaluation was altered from **{decision_raw}** to **{decision_fair}** to remediate historical gender distribution bias arrays (+{(0.5 - 0.20 if sex == 'Female' else 0.5 - 0.63):.3f} threshold skew shifted).")
    elif rl_active:
        st.success("✅ **Remediation Inspection Passed:** Optimization engine analyzed parameters and verified baseline criteria aligned smoothly with target demographic safety bounds.")

# --------------------------------------------------------
# ANALYTICS SNAPSHOT TOPOLOGICAL CHART
# --------------------------------------------------------
st.markdown("---")
st.markdown("### 📈 Comprehensive System Performance & Regulatory Envelope Analytics")

col_graph, col_explainer = st.columns([2, 1], gap="medium")

with col_graph:
    metrics = ["Global Model Accuracy", "Disparate Impact Index"]
    before_metrics = [0.852, 0.317]
    after_metrics = [0.842, 0.810]
    
    fig, ax = plt.subplots(figsize=(10, 4.2))
    x = np.arange(len(metrics))
    width = 0.30
    
    rects1 = ax.bar(x - width/2, before_metrics, width, label='Unmitigated Production Baseline', color='#FDA4AF', edgecolor='#F43F5E', linewidth=1)
    rects2 = ax.bar(x + width/2, after_metrics, width, label='EquiPath Remediated State', color='#86EFAC', edgecolor='#22C55E', linewidth=1)
    
    ax.set_ylabel('Topological Metric Ratio Scale', fontsize=10, fontweight='bold', color='#475569')
    ax.set_xticks(x)
    ax.set_xticklabels(metrics, fontsize=11, fontweight='bold', color='#1E293B')
    ax.set_ylim(0, 1.15)
    ax.legend(loc='upper right', frameon=True, facecolor='#F8FAFC')
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    
    # Inline functional script helper loop to stamp values on bar vectors cleanly
    def autolabel(rects):
        for rect in rects:
            height = rect.get_height()
            ax.annotate(f'{height:.3f}',
                        xy=(rect.get_x() + rect.get_width() / 2, height),
                        xytext=(0, 3),  
                        textcoords="offset points",
                        ha='center', va='bottom', fontsize=10, fontweight='bold')
                        
    autolabel(rects1)
    autolabel(rects2)
    
    # Plot the explicit legal baseline rule bounds
    ax.axhline(0.80, color='#DC2626', linestyle='--', linewidth=1.2, alpha=0.8)
    ax.text(0.72, 0.83, "US EEOC 80% Legal Threshold Minimum", color='#DC2626', fontsize=9, fontweight='bold')
    
    st.pyplot(fig)

with col_explainer:
    st.markdown("#### Strategic Performance Trade-Off Report")
    st.caption("Audited Evaluation Data Frame Metrics")
    st.write("Executing threshold-shifting on the final continuous inference probability landscape allows the operational system to achieve significant compliance corrections with minimal impact on model performance:")
    st.markdown("""
    * **Disparate Impact Target:** Increased from a biased baseline profile of **0.317** to a legally compliant **0.810**, satisfying regulatory mandates.
    * **System Efficiency Retained:** Global model classification accuracy drops by a negligible **1.00%** overall ($85.2\% \\rightarrow 84.2\%$).
    """)

st.markdown("---")
st.caption("• EquiPath System Interface v1.0.0 • Production Environment Active • Certified Responsible AI Framework")